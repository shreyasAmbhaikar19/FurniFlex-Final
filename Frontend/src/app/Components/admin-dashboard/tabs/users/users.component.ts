import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoading = true;
  users: any = [];
  userForm!: FormGroup;
  isEditingUser = false;
  currentUser: any | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
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
    this.isEditingUser = true;
    this.userForm.patchValue({ role: user.role });
  }

  onSubmit(): void {
    if (this.userForm.valid && this.currentUser) {
      const formData = new FormData();
      formData.append('role', this.userForm.value.role);
      
      this.userService.updateUserRole(this.currentUser._id, this.userForm.value.role).subscribe({
        next: () => this.afterSubmit(),
        error: error => console.error('Error updating user:', error)
      });
    }
  }

  onCancel(): void {
    this.isEditingUser = false;
    this.currentUser = null;
  }

  afterSubmit(): void {
    this.fetchUsers();
    this.isEditingUser = false;
    this.currentUser = null;
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

