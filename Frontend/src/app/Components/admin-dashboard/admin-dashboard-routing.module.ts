import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { ProductsTabComponent } from './tabs/products/products.component';
import { UsersComponent } from './tabs/users/users.component';
import { OrdersComponent } from './tabs/orders/orders.component';
import { adminGuard } from '../../Services/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [adminGuard], 
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsTabComponent, canActivate: [adminGuard] },
      { path: 'users', component: UsersComponent, canActivate: [adminGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [adminGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
