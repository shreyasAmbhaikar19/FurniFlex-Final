// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../../Services/auth.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit, OnDestroy {
//   isLoggedIn: boolean = false;
//   private authListenerSubs!: Subscription;

//   constructor(private authService: AuthService) {}

//   ngOnInit() {
//     this.isLoggedIn = this.authService.isLoggedIn();
//     this.authListenerSubs = this.authService.getIsAuth().subscribe(isAuthenticated => {
//       this.isLoggedIn = isAuthenticated;
//     });
//   }

//   onLogout() {
//     this.authService.logout();
//   }

//   ngOnDestroy() {
//     this.authListenerSubs.unsubscribe();
//   }
// }



// // src/app/components/header/header.component.ts
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../../Services/auth.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit, OnDestroy {
//   isLoggedIn: boolean = false;
//   private authListenerSubs!: Subscription;

//   constructor(private authService: AuthService) {}

//   ngOnInit() {
//     this.isLoggedIn = this.authService.isLoggedIn();
//     this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
//       this.isLoggedIn = isAuthenticated;
//     });
//   }

//   onLogout() {
//     this.authService.logout();
//   }

//   ngOnDestroy() {
//     this.authListenerSubs.unsubscribe();
//   }
// }


import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
}



// import { Component, OnInit } from '@angular/core';
// // import { AuthService } from '../../Services/auth.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
//   isLoggedIn: boolean = false;
//   userRole: string = '';

//   // constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     // this.authService.isLoggedIn.subscribe((status) => {
//     //   this.isLoggedIn = status;
//     // });

//     // this.authService.getUserRole().subscribe((role) => {
//     //   this.userRole = role;
//     // });
//   }

//   logout(): void {
//     // this.authService.logout();
//   }
// }
