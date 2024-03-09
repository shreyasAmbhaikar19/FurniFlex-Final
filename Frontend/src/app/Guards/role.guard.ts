// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../Services/auth.service';

// export const canActivateBasedOnRole = (expectedRole: string) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   return () => {
//     const role = authService.getRole();
//     if (authService.isLoggedIn() && role === expectedRole) {
//       return true;
//     } else {
//       router.navigate(['/login']);
//       return false;
//     }
//   };
// };


// src/app/guards/role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentRole = this.authService.getRole();

    if (this.authService.isLoggedIn() && currentRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
