import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    // Subscribe to the isLoggedIn observable to get the login status
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logout() {
    // Delegate logout action to AuthService and it will update the isLoggedIn$ observable
    this.authService.logout();
  }
}

