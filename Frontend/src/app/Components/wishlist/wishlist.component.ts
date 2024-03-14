

import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service'; 

import { Product } from '../../Models/product';

interface WishlistItem {
  _id: string;
  product: Product;
}

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  baseUrl: string = 'http://localhost:3000/'; // Adjust this URL based on how your images are served
  price: any;
  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.fetchWishlistItems();
  }

  fetchWishlistItems(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        // Ensure your response matches the structure; you might need to adjust this part
        this.wishlistItems = response.wishlist.map((item: any) => ({
          ...item,
          product: {
            ...item.product,
            
            images: item.product.images.map((image: string) => 
              `${this.baseUrl}${image.replace(/\\/g, '/')}` // Transform server path into usable URLs
              
            ),
           
          },
          

        }));
        
        
      },
    
      error: (error) => console.error('Error fetching wishlist items:', error),
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        // After successful deletion, filter out the removed item
        this.wishlistItems = this.wishlistItems.filter(item => item.product._id !== productId);
        alert('Product removed from your wishlist!');
      },
      error: () => {
        alert('Failed to remove product from wishlist. Please try again.');
      },
    });
  }

  // Helper method to get the first image URL or a default image
  getImageUrl(images: string[]): string {
    return images.length > 0 ? images[0] : 'https://via.placeholder.com/150';
  }
}
