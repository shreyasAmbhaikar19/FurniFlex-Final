import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service'; 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // This should ideally be typed more specifically
  totalCartPrice = 0;
  baseUrl: string = 'http://localhost:3000/'; // Base URL for images

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    // Example userId - in a real application, you should retrieve this from your authentication service
    const userId = "65ed1af2de41ddfbbfadb575";
    this.cartService.getUserCartItems(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.cartItems = response.cartItems;
          this.calculateTotalCartPrice();
        }
      },
      error: (error) => console.error('Error fetching cart items:', error)
    });
  }

  calculateTotalCartPrice(): void {
    this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  // Method for generating full image URLs
  getImageUrl(relativePath: string): string {
    return `${this.baseUrl}${relativePath.replace(/\\/g, '/')}`; // Correctly format the path
  }
}
