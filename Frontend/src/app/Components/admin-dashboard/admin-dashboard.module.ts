import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// Import all the components used in the admin dashboard
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ProductsTabComponent } from './tabs/products/products.component';
import { UsersComponent } from './tabs/users/users.component';
import { OrdersComponent } from './tabs/orders/orders.component';
import { CategoriesComponent } from './tabs/categories/categories.component';
import { DeleteDialogComponent } from './tabs/delete-dialog/delete-dialog.component';
import { UpdateStatusDialogComponent } from './tabs/orders/update-status-dialog/update-status-dialog.component';
import { OrderDetailsDialogComponent } from './tabs/orders/order-details-dialog/order-details-dialog.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductsTabComponent,
    UsersComponent,
    OrdersComponent,
    CategoriesComponent,
    DeleteDialogComponent,
    UpdateStatusDialogComponent,
    OrderDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class AdminDashboardModule { }
