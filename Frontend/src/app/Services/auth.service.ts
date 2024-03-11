// // import { Injectable } from '@angular/core';
// // import { CookieService } from 'ngx-cookie-service';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {

// //   constructor(private cookieService: CookieService) { }

// //   setUserData(token: string, role: string): void {
// //     this.cookieService.set('token', token);
// //     this.cookieService.set('role', role);
// //   }

// //   getToken(): string {
// //     return this.cookieService.get('token');
// //   }

// //   getRole(): string {
// //     return this.cookieService.get('role');
// //   }

// //   isLoggedIn(): boolean {
// //     return this.getToken() !== '';
// //   }

// //   clearUserData(): void {
// //     this.cookieService.delete('token');
// //     this.cookieService.delete('role');
// //   }
// // }


// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { BehaviorSubject, Observable } from 'rxjs';
// // import { CookieService } from 'ngx-cookie-service';

// // @Injectable({
// //   providedIn: 'root'
// // })

// // export class AuthService {
// //   private baseUrl = 'http://localhost:3000/api/v1'; 
// //   private authStatusListener = new BehaviorSubject<boolean>(this.isLoggedIn());

// //   constructor(private http: HttpClient, private cookieService: CookieService) { }

// //   register(user: any): Observable<any> {
// //     return this.http.post(`${this.baseUrl}/register`, user);
// //   }

// //   login(email: string, password: string): Observable<any> {
// //     return this.http.post(`${this.baseUrl}/login`, { email, password });
// //   }

// //   logout(): void {
// //     this.cookieService.delete('token');
// //     this.cookieService.delete('role');
// //     this.http.get(`${this.baseUrl}/logout`).subscribe(() => {
// //       this.authStatusListener.next(false);
// //     });
// //   }

// //   setUserData(token: string, role: string): void {
// //     this.cookieService.set('token', token, { sameSite: 'Lax' });
// //     this.cookieService.set('role', role, { sameSite: 'Lax' });
// //     this.authStatusListener.next(true);
// //   }

// //   getToken(): string {
// //     return this.cookieService.get('token');
// //   }

// //   getRole(): string {
// //     return this.cookieService.get('role');
// //   }
  
// //   getAuthStatusListener(): Observable<boolean> {
// //     return this.authStatusListener.asObservable();
// //   }

// //   isLoggedIn(): boolean {
// //     return this.getToken() !== '';
// //   }

// //   clearUserData(): void {
// //     this.cookieService.delete('token');
// //     this.cookieService.delete('role');
// //   }
// // }
  



// // // src/app/services/auth.service.ts
// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { BehaviorSubject, Observable } from 'rxjs';
// // import { CookieService } from 'ngx-cookie-service';
// // import { tap } from 'rxjs/operators';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private baseUrl = 'http://localhost:3000/api/v1';
// //   private isAuthenticated = new BehaviorSubject<boolean>(this.checkIsLoggedIn());

// //   constructor(private http: HttpClient, private cookieService: CookieService) {}

// //   private checkIsLoggedIn(): boolean {
// //     return !!this.cookieService.get('token');
// //   }

// //   register(user: any): Observable<any> {
// //     return this.http.post(`${this.baseUrl}/register`, user);
// //   }

// //   login(email: string, password: string): Observable<any> {
// //     return this.http.post<{token: string, user: {role: string}}>(`${this.baseUrl}/login`, { email, password }).pipe(
// //       tap(response => {
// //         this.cookieService.set('token', response.token);
// //         this.cookieService.set('role', response.user.role);
// //         this.isAuthenticated.next(true);
// //       })
// //     );
// //   }

// //   logout(): void {
// //     this.http.get(`${this.baseUrl}/logout`).subscribe(() => {
// //       this.cookieService.delete('token');
// //       this.cookieService.delete('role');
// //       this.isAuthenticated.next(false);
// //     });
// //   }

// //   getIsAuth(): Observable<boolean> {
// //     return this.isAuthenticated.asObservable();
// //   }
// // }




// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(this.checkToken());
//   isLoggedIn = this.loggedIn.asObservable();
//   private userRole = new BehaviorSubject<string>(this.getRoleFromCookie());

//   constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

//   private checkToken(): boolean {
//     return this.cookieService.check('token');
//   }

//   private getRoleFromCookie(): string {
//     return this.cookieService.get('role');
//   }

//   public setUserRole(role: string): void {
//     this.userRole.next(role);
//   }

//   public getUserRole(): Observable<string> {
//     return this.userRole.asObservable();
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<{token: string, user: any}>('/api/v1/login', { email, password }).pipe(
//       tap(response => {
//         this.cookieService.set('role', response.user.role);
//         this.loggedIn.next(true);
//         this.userRole.next(response.user.role);
//       })
//     );
//   }

//   logout(): void {
//     this.cookieService.delete('token');
//     this.cookieService.delete('role');
//     this.loggedIn.next(false);
//     this.userRole.next('');
//     this.router.navigate(['/login']);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/v1/login', { email, password });
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

  saveUserRole(role: string) {
    this.cookieService.set('userRole', role);
  }

  getUserRole(): string {
    return this.cookieService.get('userRole');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== '';
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('userRole');
    this.router.navigate(['/login']);
  }
}
