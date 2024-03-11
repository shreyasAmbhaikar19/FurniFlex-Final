// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router'; // Import Router
// import { AuthService } from '../../Services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router 
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)]],
//       password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]]
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
//         next: (response) => {
//           this.authService.setUserData(response.token, response.user.role);

//           if (response.user.role === 'admin') {
//             this.router.navigate(['/admin']); 
//           } else {
//             this.router.navigate(['/home']);
//           }
//         },
//         error: (error) => {
//           console.error('Login error:', error);
//         }
//       });
//     }
//   }
// }




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response: any) => {
            this.authService.saveToken(response.token);
            this.authService.saveUserRole(response.user.role);
  
            if (response.user.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/products']);
            }
          },
          error: (err) => {
          }
        });
    }
  }
  
}
