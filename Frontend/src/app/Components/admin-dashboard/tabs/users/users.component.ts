// users.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../Services/user.service'; // Adjust the path as necessary

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoading = true;
  users : any = [];
  userForm!: FormGroup;
  addUserForm!: FormGroup;
  isEditing = false;
  isAdding = false;
  currentUser: any | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: [''],
      role: ['', Validators.required]
    });

    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: [''],
      role: ['', Validators.required]
    });
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.isLoading = false;
      }
    });
  }

  onEdit(user: any): void {
    this.currentUser = user;
    this.isEditing = true;
    this.isAdding = false;
    this.userForm.patchValue(user);
  }

  onAdd(): void {
    this.isAdding = true;
    this.isEditing = false;
  }

  onSubmitAdd(): void {

    console.log(this.addUserForm.value);
    if (this.addUserForm.valid) {
      this.userService.createUser(this.addUserForm.value).subscribe({
        next: () => this.afterSubmit(),
        error: error => console.error('Error creating user:', error)
      });
    }
  }

  onSubmitEdit(): void {
    if (this.userForm.valid && this.currentUser) {
      this.userService.updateUser(this.currentUser._id, this.userForm.value).subscribe({
        next: () => this.afterSubmit(),
        error: error => console.error('Error updating user:', error)
      });
    }
  }

  onCancel(): void {
    this.isEditing = false;
    this.isAdding = false;
    this.currentUser = null;
  }

  afterSubmit(): void {
    this.fetchUsers();
    this.isEditing = false;
    this.isAdding = false;
    this.currentUser = null;
  }

  updateUser(userId: string, userData: any): void {
    this.userService.updateUser(userId, userData).subscribe({
      next: () => {
        this.fetchUsers(); // Reload users to reflect the update
      },
      error: (error) => console.error('Error updating user:', error)
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.fetchUsers();
        },
        error: (error) => {
          console.error('Error deleting the user:', error);
        }
      });
    }
  }
}
