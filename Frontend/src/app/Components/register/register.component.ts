// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../Services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   registerForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder, 
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.registerForm = this.fb.group({
//       firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
//       lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
//       email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)]],
//       phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]]
//     });
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       this.authService.register(this.registerForm.value).subscribe({
//         next: (response) => {
//           console.log('Registration successful', response);
//           this.router.navigate(['/home']);
//         },
//         error: (error) => { 
//           console.error('Registration failed', error);
//         }
//       });
//     }
//   }
// }





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          alert('Registration failed. Please try again.');
          console.error('Registration error:', error);
        },
      });
    }
  }
}
