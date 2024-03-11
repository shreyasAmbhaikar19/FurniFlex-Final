// // src/app/components/products.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../Services/products.service';
// import { Product } from '../../Models/product';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products: Product[] = [];
//   baseUrl: string = 'http://localhost:3000/'; 

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.productService.getAllProducts().subscribe(products => {
//       // Prepend the base URL to the image paths
//       this.products = products.map(product => {
//         if (product.images) {
//           product.images = product.images.map(image => this.baseUrl + image.replace(/\\/g, '/'));
//         }
//         return product;
//       });
//       console.log(this.products);
//     });
//   }

//   getImageUrl(images: string[]): string {
//     if (images && images.length > 0) {
//       return images[0];
//     } 
//     else {
//       return 'path/to/your/default/image.jpg'; 
//     }
//   }
// }


// // src/app/components/products.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../Services/products.service';
// import { Product } from '../../Models/product';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products: Product[] = [];
//   baseUrl: string = 'http://localhost:3000/'; 
//   keyword: string = ''; // Added for search functionality

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.getAllProducts(); // Call this method to fetch all products initially
//   }

//   getAllProducts(): void {
//     this.productService.getAllProducts().subscribe(products => {
//       this.products = products.map(product => {
//         if (product.images) {
//           product.images = product.images.map(image => this.baseUrl + image.replace(/\\/g, '/'));
//         }
//         return product;
//       });
//       console.log(this.products);
//     });
//   }

//   searchProducts(): void {
//     if (this.keyword.trim()) {
//       this.productService.searchProducts(this.keyword).subscribe(data => {
//         if (data.success) {
//           this.products = data.products.map(product => {
//             if (product.images) {
//               product.images = product.images.map(image => this.baseUrl + image.replace(/\\/g, '/'));
//             }
//             return product;
//           });
//         } else {
//           // Handle failure or reset products list, depending on your application logic
//           this.products = [];
//         }
//       }, error => {
//         console.error('Error fetching products:', error);
//         // Optionally handle error, show user feedback, or reset products list
//         this.products = [];
//       });
//     } else {
//       // If no keyword is provided, fetch all products again
//       this.getAllProducts();
//     }
//   }

//   onSearch(): void {
//     this.searchProducts();
//   }

//   getImageUrl(images: string[]): string {
//     if (images && images.length > 0) {
//       return images[0];
//     } else {
//       return 'path/to/your/default/image.jpg'; // Make sure to replace this path with your actual default image path
//     }
//   }
// }


// // src/app/components/products.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../Services/products.service';
// import { Product } from '../../Models/product';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products: Product[] = [];
//   baseUrl: string = 'http://localhost:3000/';
//   keyword: string = '';

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.fetchProducts();
//   }

//   fetchProducts(): void {
//     // Decide to fetch all or search based on the presence of a keyword
//     const fetchObservable = this.keyword.trim() ?
//       this.productService.searchProducts(this.keyword) :
//       this.productService.getAllProducts();

//     fetchObservable.subscribe(data => {
//       const fetchedProducts = data.success ? data.products : data; // Adjust based on the API response
//       this.products = fetchedProducts.map(product => ({
//         ...product,
//         images: product.images.map(image => this.baseUrl + image.replace(/\\/g, '/'))
//       }));
//     });
//   }

//   onSearch(): void {
//     this.fetchProducts();
//   }

//   getImageUrl(images: string[]): string {
//     return images && images.length > 0 ? images[0] : 'path/to/your/default/image.jpg';
//   }
// }


// src/app/components/products.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/products.service';
import { WishlistService } from '../../Services/wishlist.service';
import { Product } from '../../Models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  addedToWishlist: { [key: string]: boolean } = {};
  baseUrl: string = 'http://localhost:3000/';
  keyword: string = '';

  constructor( private productService: ProductService, 
    private wishlistService: WishlistService, 
    private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    const fetchObservable = this.keyword.trim() ?
      this.productService.searchProducts(this.keyword) :
      this.productService.getAllProducts();

    fetchObservable.subscribe(data => {
      // Assuming the response for getAllProducts also has a 'success' property
      const fetchedProducts = 'success' in data ? data.products : data; 
      this.products = fetchedProducts.map((product: Product) => ({
        ...product,
        images: product.images.map((image: string) => this.baseUrl + image.replace(/\\/g, '/'))
      }));
    });
  }

  onSearch(): void {
    this.fetchProducts();
  }

  getImageUrl(images: string[]): string {
    return images && images.length > 0 ? images[0] : 'path/to/your/default/image.jpg';
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  addToWishlist(productId: string): void {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: (response) => {
        this.addedToWishlist[productId] = true; // Mark as added
        alert('Product added to your wishlist!'); // Display status message
      },
      error: (error) => {
        console.error('Error adding product to wishlist:', error);
        alert('Failed to add product to wishlist. Please try again.');
      }
    });
  }
}










