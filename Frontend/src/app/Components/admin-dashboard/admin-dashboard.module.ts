import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-dashboard-routing.module'; // Make sure this path is correct

// Import all the components used in the admin dashboard
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ProductsTabComponent } from './tabs/products/products.component';
import { UsersComponent } from './tabs/users/users.component';
import { OrdersComponent } from './tabs/orders/orders.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductsTabComponent,
    UsersComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
})
export class AdminDashboardModule { }
