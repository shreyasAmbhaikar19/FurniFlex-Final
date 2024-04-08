import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/order.service';

interface OrderItem {
  question: string;
  answer: string;
  open: boolean;
  orderItems: any[]; // Adjust based on the actual structure of your order items
  totalPrice: number;
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit  {
  orders: OrderItem[] = [];
  baseUrl: string = 'http://localhost:3000/';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (response) => {
        this.orders = response.orders.map((order: any) => ({
          question: `Order ID: ${order._id}`,
          answer: `Status: ${order.orderStatus}, Total Price: ${order.totalPrice}`,
          open: false,
          orderItems: order.orderItems.map((item: any) => ({
            ...item,
            image: this.getImageUrl(item.image) // Transform image path to URL
          })),
          totalPrice: order.totalPrice
        }));
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  toggleOrder(index: number): void {
    this.orders.forEach((order, i) => {
      if (i !== index) order.open = false;
    });
    
    this.orders[index].open = !this.orders[index].open;
  }

  getImageUrl(imagePath: string): string {
    // Adjust this method according to how your images are stored and served
    return `${this.baseUrl}${imagePath.replace(/\\/g, '/')}`;
  }
}
