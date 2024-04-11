import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { OrderService } from '../../../../Services/order.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UpdateStatusDialogComponent } from './update-status-dialog/update-status-dialog.component';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  isLoading: boolean = true;
  orders: any[] = [];
  editForm!: FormGroup;
  isEditing: boolean = false;

  keyword: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  limit: number = 4;
  paginationNumbers: number[] = [];

  private searchTerms = new Subject<string>();

  constructor(private orderService: OrderService, private fb: FormBuilder, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.keyword = keyword;
      this.loadOrders(true);
    });
  }

  openDeleteDialog(order: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Order',
        message: `Are you sure you want to delete the order with ID: ${order._id}?`,
        confirmText: 'Yes, delete it',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOrder(order._id);
      }
    });
  }

  updateOrder(order: any): void {
    const dialogRef = this.dialog.open(UpdateStatusDialogComponent, {
      width: '400px',
      data: { order: order }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const orderData = { status: result };
        this.orderService.updateOrder(order._id, orderData).subscribe({
          next: () => this.loadOrders(),
          error: (error) => console.error('Error updating order:', error)
        });
      }
    });
  }

  openOrderDetails(order: any): void {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '600px',
      data: { order: order }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle after close action if necessary
    });
  }

  loadOrders(isSearchOperation: boolean = false): void {
    this.isLoading = true;
    const operationObservable = isSearchOperation
      ? this.orderService.searchAndPaginateOrders(this.keyword, this.currentPage, this.limit)
      : this.orderService.getAllOrders(this.currentPage, this.limit);

    operationObservable.subscribe({
      next: (response) => {
        console.log(response.orders);
        this.orders = response.orders;
        this.totalPages = response.totalPages;
        this.updatePaginationNumbers();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      },
    });
  }

  updatePaginationNumbers(): void {
    this.paginationNumbers = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  search(keyword: string): void {
    this.searchTerms.next(keyword);
  }

  searchUsers(): void {
    this.currentPage = 1;
    this.loadOrders(true);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadOrders(this.keyword.length > 0);
  }

  deleteOrder(orderId: string): void {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => this.loadOrders(),
        error: (error) => console.error('Error deleting the order:', error),
      });
  }
}
