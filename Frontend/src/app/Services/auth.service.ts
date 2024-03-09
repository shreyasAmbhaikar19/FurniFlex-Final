// import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private cookieService: CookieService) { }

//   setUserData(token: string, role: string): void {
//     this.cookieService.set('token', token);
//     this.cookieService.set('role', role);
//   }

//   getToken(): string {
//     return this.cookieService.get('token');
//   }

//   getRole(): string {
//     return this.cookieService.get('role');
//   }

//   isLoggedIn(): boolean {
//     return this.getToken() !== '';
//   }

//   clearUserData(): void {
//     this.cookieService.delete('token');
//     this.cookieService.delete('role');
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = 'http://localhost:3000/api/v1'; 

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('role');
    this.http.get(`${this.baseUrl}/logout`).subscribe();
  }

  setUserData(token: string, role: string): void {
    this.cookieService.set('token', token);
    this.cookieService.set('role', role);
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  getRole(): string {
    return this.cookieService.get('role');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== '';
  }

  clearUserData(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('role');
  }
}
  