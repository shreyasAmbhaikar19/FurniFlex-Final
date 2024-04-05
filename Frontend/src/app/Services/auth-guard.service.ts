import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isLoggedIn() || authService.getUserRole() !== 'user') {
    return router.parseUrl('/login');
  }
  
  return true;
};


export const adminGuard = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isLoggedIn() || authService.getUserRole() !== 'admin') {
    return router.parseUrl('/home');
  }
  
  return true;
};
