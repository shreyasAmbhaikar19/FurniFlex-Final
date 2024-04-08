import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup; 
  passwordForm!: FormGroup;
  user: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toast: NgToastService) { }

  ngOnInit(): void {
    this.initProfileForm();
    this.initPasswordForm(); 
    this.getUserDetails();
  }

  initProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  getUserDetails(): void {
    this.userService.getUserDetails().subscribe({
      next: (response) => {
        this.user = response.user;
        this.profileForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          address: this.user.address
        });
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

  updateUserDetails(): void {
    if (this.profileForm.valid) {
      const updatedUserDetails = this.profileForm.value;
      this.userService.updateUserDetails(updatedUserDetails).subscribe({
        next: (response) => {
          console.log('User details updated successfully:', response);
          this.toast.success({detail:"SUCCESS", summary:'User details updated successfully!', duration:3000, position:'topRight'});
          this.getUserDetails();
        },
        error: (error) => {
          console.error('Error updating user details:', error);
          this.toast.error({detail:"ERROR", summary:'Error updating user details!', duration:3000, position:'topRight'});
        }
      });
    }
  }

  // updatePassword(): void {
  //   if (this.passwordForm.valid) {
  //     const passwordData = this.passwordForm.value;
  //     this.userService.updatePassword(passwordData).subscribe({
  //       next: (response) => {
  //         console.log('Password updated successfully:', response);

  //         this.passwordForm.reset();
  //       },
  //       error: (error) => {
  //         console.error('Error updating password:', error);
  //       }
  //     });
  //   }
  // }
}
