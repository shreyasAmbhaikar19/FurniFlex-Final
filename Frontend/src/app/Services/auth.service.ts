import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/v1/login', { email, password }).pipe(
      tap(response => {
        if (response.success) {
          this.saveToken(response.token);
          this.saveUserRole(response.user.role);
          this.saveUserId(response.user._id); 
        }
      })
    );
  }
  
  saveUserId(userId: string) {
    this.cookieService.set('userId', userId);
  }
  
  getUserId(): string {
    return this.cookieService.get('userId');
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
    this.cookieService.delete('userId'); 
    this.router.navigate(['/login']);
  }
}
