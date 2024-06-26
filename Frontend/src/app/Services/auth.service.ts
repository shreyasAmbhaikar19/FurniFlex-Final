// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CookieService } from 'ngx-cookie-service';
// import { Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

//   login(email: string, password: string) {
//     return this.http.post<any>('http://localhost:3000/api/v1/login', { email, password }).pipe(
//       tap(response => {
//         if (response.success) {
//           this.saveToken(response.token);
//           this.saveUserRole(response.user.role);
//           this.saveUserId(response.user._id); 
//         }
//       })
//     );
//   }
  
//   saveUserId(userId: string) {
//     this.cookieService.set('userId', userId);
//   }
  
//   getUserId(): string {
//     return this.cookieService.get('userId');
//   }

//   register(userData: any): Observable<any> {
//     return this.http.post('http://localhost:3000/api/v1/register', userData);
//   }

//   saveToken(token: string) {
//     this.cookieService.set('token', token);
//   }

//   getToken(): string {
//     return this.cookieService.get('token');
//   }

//   isLoggedIn(): boolean {
//     return this.getToken() !== '';
//   }

//   // getToken(): Promise<string> {
//   //   return new Promise((resolve, reject) => {
//   //     setTimeout(() => {
//   //       const token = this.cookieService.get('token');
//   //       if (token) {
//   //         resolve(token);
//   //       } else {
//   //         reject('Token not found');
//   //       }
//   //     }, 100); 
//   //   });
//   // }

//   // isLoggedIn(): boolean {
//   //   const token = this.cookieService.get('token');
//   //   return !!token; 
//   // }

//   saveUserRole(role: string) {
//     this.cookieService.set('userRole', role);
//   }

//   getUserRole(): string {
//     return this.cookieService.get('userRole');
//   }

//   logout() {
//     this.cookieService.delete('token');
//     this.cookieService.delete('userRole');
//     this.cookieService.delete('userId'); 
//     this.router.navigate(['/login']);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService, 
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/login', { email, password }).pipe(
      tap(response => {
        if (response.success) {
          this.saveToken(response.token);
          this.saveUserRole(response.user.role);
          this.saveUserId(response.user._id);
          this.loggedInStatus.next(true);
        }
      })
    );
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('userRole');
    this.cookieService.delete('userId');
    this.loggedInStatus.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  register(userData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/register', userData);
  }

  saveToken(token: string) {
    this.cookieService.set('token', token);
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  saveUserId(userId: string) {
    this.cookieService.set('userId', userId);
  }
  
  getUserId(): string {
    return this.cookieService.get('userId');
  }

  saveUserRole(role: string) {
    this.cookieService.set('userRole', role);
  }

  getUserRole(): string {
    return this.cookieService.get('userRole');
  }

  private hasToken(): boolean {
    return this.getToken() !== '';
  }
}
