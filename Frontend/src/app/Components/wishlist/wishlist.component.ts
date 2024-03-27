// import { Component, OnInit } from '@angular/core';
// import { WishlistService } from '../../Services/wishlist.service'; 
// import { Product } from '../../Models/product';

// interface WishlistItem {
//   _id: string;
//   product: Product;
// }

// @Component({
//   selector: 'app-wishlist',
//   templateUrl: './wishlist.component.html',
//   styleUrls: ['./wishlist.component.css'],
// })
// export class WishlistComponent implements OnInit {
//   wishlistItems: WishlistItem[] = [];
//   baseUrl: string = 'http://localhost:3000/'; 
//   price: any;
//   constructor(private wishlistService: WishlistService) {}

//   ngOnInit(): void {
//     this.fetchWishlistItems();
//   }

//   fetchWishlistItems(): void {
//     this.wishlistService.getWishlist().subscribe({
//       next: (response) => {
        
//         this.wishlistItems = response.wishlist.map((item: any) => ({
//           ...item,
//           product: {
//             ...item.product,
            
//             images: item.product.images.map((image: string) => 
//               `${this.baseUrl}${image.replace(/\\/g, '/')}` 
//             ),
//           },
//         })); 
//       },
    
//       error: (error) => console.error('Error fetching wishlist items:', error),
//     });
//   }

//   removeFromWishlist(productId: string): void {
//     this.wishlistService.removeFromWishlist(productId).subscribe({
//       next: () => {
//         this.wishlistItems = this.wishlistItems.filter(item => item.product._id !== productId);
//         alert('Product removed from your wishlist!');
//       },
//       error: () => {
//         alert('Failed to remove product from wishlist. Please try again.');
//       },
//     });
//   }

//   getImageUrl(images: string[]): string {
//     return images.length > 0 ? images[0] : 'https://via.placeholder.com/150';
//   }
// }



import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service'; 
import { Product } from '../../Models/product';

interface Subscription {
  duration: string;
  monthlyPrice: string;
}

interface WishlistItem {
  _id: string;
  product: Product;
  subscriptions: Subscription[];
}

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  baseUrl: string = 'http://localhost:3000/';

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.fetchWishlistItems();
  }

  fetchWishlistItems(): void {
    // this.wishlistService.getWishlist().subscribe({
    //   next: (response) => {
    //     const fetchedWishlistItems = response.wishlist;
    //     console.log(fetchedWishlistItems);
        
    //     this.wishlistItems = fetchedWishlistItems.map((item: any) => ({
    //       ...item,
    //       product: {
    //         ...item.product,
    //         images: item.product.images.map((image: string) => this.baseUrl + image.replace(/\\/g, '/')),
    //       },
    //     }));

    //     for (let i = 0; i < this.wishlistItems.length; i++) {
    //       this.wishlistItems[i].product.subscriptions = JSON.parse(this.wishlistItems[i].product.subscriptions[0]);
    //       console.log(this.wishlistItems[i].product.subscriptions);
    //     }
    //   },
    //   error: (error) => console.error('Error fetching wishlist items:', error),
    // });

    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        const fetchedWishlistItems = response.wishlist;
        console.log(fetchedWishlistItems);
        
        this.wishlistItems = fetchedWishlistItems.map((item: any) => ({
          ...item,
          product: {
            ...item.product,
            images: item.product.images.map((image: string) => this.baseUrl + image.replace(/\\/g, '/')),
            monthlyPrice: item.product.subscriptions[0]?.monthlyPrice ?? 'N/A', 
          },
        }));
      },
      error: (error) => console.error('Error fetching wishlist items:', error),
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(item => item.product._id !== productId);
        alert('Product removed from your wishlist!');
      },
      error: () => {
        alert('Failed to remove product from wishlist. Please try again.');
      },
    });
  }

  getImageUrl(images: string[]): string {
    return images.length > 0 ? images[0] : 'https://via.placeholder.com/150';
  }
}
