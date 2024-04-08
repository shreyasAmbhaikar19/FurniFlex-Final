import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component'; 
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { SingleProductComponent } from './Components/single-product/single-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { authGuard, adminGuard } from './Services/auth-guard.service';
import { UserSettingsComponent } from './Components/user-settings/user-settings.component';
import { ProfileComponent } from './Components/user-settings/profile/profile.component';
import { OrderHistoryComponent } from './Components/user-settings/order-history/order-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'carts', component: CartComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard]  },
  { path: 'feedback', component: FeedbackComponent, canActivate: [authGuard]  },
  { path: 'settings', component: UserSettingsComponent, canActivate: [authGuard], 
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'order-history', component: OrderHistoryComponent }
    ] 
  },
  { path: 'admin', loadChildren: () => import('./Components/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
