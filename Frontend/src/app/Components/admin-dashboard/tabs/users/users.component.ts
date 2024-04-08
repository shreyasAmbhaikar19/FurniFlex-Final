// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { UserService } from '../../../../Services/user.service';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css']
// })
// export class UsersComponent implements OnInit {
//   isLoading = true;
//   users: any = [];
//   userForm!: FormGroup;
//   isEditingUser = false;
//   currentUser: any | null = null;

//   constructor(private userService: UserService, private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.fetchUsers();
//     this.initForm();
//   }

//   initForm(): void {
//     this.userForm = this.fb.group({
//       role: ['', Validators.required]
//     });
//   }

//   fetchUsers(): void {
//     this.isLoading = true;
//     this.userService.getAllUsers().subscribe({
//       next: (data) => {
//         this.users = data.users;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('There was an error!', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   onEdit(user: any): void {
//     this.currentUser = user;
//     this.isEditingUser = true;
//     this.userForm.patchValue({ role: user.role });
//   }

//   onSubmit(): void {
//     if (this.userForm.valid && this.currentUser) {
//       const formData = new FormData();
//       formData.append('role', this.userForm.value.role);
      
//       this.userService.updateUserRole(this.currentUser._id, this.userForm.value.role).subscribe({
//         next: () => this.afterSubmit(),
//         error: error => console.error('Error updating user:', error)
//       });
//     }
//   }

//   onCancel(): void {
//     this.isEditingUser = false;
//     this.currentUser = null;
//   }

//   afterSubmit(): void {
//     this.fetchUsers();
//     this.isEditingUser = false;
//     this.currentUser = null;
//   }

//   deleteUser(userId: string): void {
//     if (confirm('Are you sure you want to delete this user?')) {
//       this.userService.deleteUser(userId).subscribe({
//         next: () => {
//           this.fetchUsers();
//         },
//         error: (error) => {
//           console.error('Error deleting the user:', error);
//         }
//       });
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../Services/user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


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

  keyword: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  limit: number = 5;
  paginationNumbers: number[] = [];

  private searchTerms = new Subject<string>();

  constructor(private userService: UserService, private fb: FormBuilder, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.initForm();
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.keyword = keyword;
      this.currentPage = 1; 
      this.fetchUsers(true);
    });
    this.fetchUsers();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      role: ['', Validators.required]
    });
  }

  openDeleteDialog(userName: string, userId: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Deleting User',
        message: `Are you sure you want to delete ${userName}?`,
        confirmText: 'Yes, delete',
        cancelText: 'No, cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  fetchUsers(isSearchOperation: boolean = false): void  {
    this.isLoading = true;
    const operation = isSearchOperation ?
      this.userService.searchUsers(this.keyword, this.currentPage, this.limit) :
      this.userService.getPaginatedUsers(this.currentPage, this.limit);

    operation.subscribe({
      next: (response) => {
        this.users = response.users;
        this.totalPages = response.totalPages;
         this.updatePaginationNumbers();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  updatePaginationNumbers(): void {
    this.paginationNumbers = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  search(keyword: string): void {
    this.searchTerms.next(keyword);
  }

  searchUsers(): void {
    this.currentPage = 1;
    this.fetchUsers(true);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.fetchUsers(this.keyword.length > 0);
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

  private deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: (error) => console.error('Failed to delete user:', error)
    });
  }
}

