import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import all the components used in the admin dashboard
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ProductsTabComponent } from './tabs/products/products.component';
import { UsersComponent } from './tabs/users/users.component';
import { OrdersComponent } from './tabs/orders/orders.component';
import { CategoriesComponent } from './tabs/categories/categories.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductsTabComponent,
    UsersComponent,
    OrdersComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class AdminDashboardModule { }
