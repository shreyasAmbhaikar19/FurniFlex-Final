// // src/app/components/products.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../Services/products.service';
// import { WishlistService } from '../../Services/wishlist.service';
// import { Product } from '../../Models/product';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products: Product[] = [];
//   addedToWishlist: { [key: string]: boolean } = {};
//   baseUrl: string = 'http://localhost:3000/';
//   keyword: string = '';
//   price:any;

//   constructor( private productService: ProductService, 
//     private wishlistService: WishlistService, 
//     private router: Router) { }

//   ngOnInit(): void {
//     this.fetchProducts();
//     this.checkWishlistStatus(); 
//   }

//   fetchProducts(): void {
//     const fetchObservable = this.keyword.trim() ?
//       this.productService.searchProducts(this.keyword) :
//       this.productService.getAllProducts();

//     fetchObservable.subscribe(data => {
//       const fetchedProducts = 'success' in data ? data.products : data; 
//       console.log(fetchedProducts);
      
//       // this.price=JSON.parse(fetchedProducts.subscription);
//       this.products = fetchedProducts.map((product: Product) => ({
//         ...product,
//         images: product.images.map((image: string) => this.baseUrl + image.replace(/\\/g, '/'))
//       }));
//       for(let i=0;i<this.products.length;i++){
//         this.products[i].subscriptions=JSON.parse(this.products[i].subscriptions)
//         console.log(this.products[i].subscriptions);
//       }
//     });
//   }

//   onSearch(): void {
//     this.fetchProducts();
//   }

//   getImageUrl(images: string[]): string {
//     return images && images.length > 0 ? images[0] : 'path/to/your/default/image.jpg';
//   }

//   viewProduct(productId: string): void {
//     this.router.navigate(['/product', productId]);
//   }

//   checkWishlistStatus(): void {
//     this.wishlistService.getWishlist().subscribe({
//       next: (response) => {
//         response.wishlist.forEach((item: any) => {
//           this.addedToWishlist[item.product._id] = true;
//         });
//       },
//       error: (error) => {
//         console.error('Error fetching wishlist:', error);
//       }
//     });
//   }

//   addToWishlist(productId: string): void {
//     this.wishlistService.addToWishlist(productId).subscribe({
//       next: () => {
//         this.addedToWishlist[productId] = true;
//         alert('Product added to your wishlist!');
//       },
//       error: () => {
//         alert('Failed to add product to wishlist. Please try again.');
//       },
//     });
//   }

//   removeFromWishlist(productId: string): void {
//     this.wishlistService.removeFromWishlist(productId).subscribe({
//       next: () => {
//         this.addedToWishlist[productId] = false;
//         alert('Product removed from your wishlist!');
//       },
//       error: () => {
//         alert('Failed to remove product from wishlist. Please try again.');
//       },
//     });
//   }

// }


// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../Services/products.service';
// import { WishlistService } from '../../Services/wishlist.service';
// import { Product } from '../../Models/product';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products: Product[] = [];
//   addedToWishlist: { [key: string]: boolean } = {};
//   baseUrl: string = 'http://localhost:3000/';
//   keyword: string = '';

//   constructor(private productService: ProductService, 
//               private wishlistService: WishlistService, 
//               private router: Router) { }

//   ngOnInit(): void {
//     this.fetchProducts();
//     this.checkWishlistStatus(); 
//   }

//   fetchProducts(): void {
//     const fetchObservable = this.keyword.trim() ?
//     this.productService.searchProducts(this.keyword) :
//     this.productService.getAllProducts();

//   fetchObservable.subscribe(data => {
//     const fetchedProducts = 'success' in data ? data.products : data;
//     this.products = fetchedProducts.map((product: any) => ({
//       ...product,
//       images: product.images.map((image: string) => this.baseUrl + image.replace(/\\/g, '/')),
//       // Ensure subscriptions array is correctly handled if empty
//       subscriptions: product.subscriptions.length ? product.subscriptions : [{ monthlyPrice: 'N/A' }]
//     }));
//   });
//   }

//   onSearch(): void {
//     this.fetchProducts();
//   }

//   getImageUrl(images: string[]): string {
//     return images && images.length > 0 ? images[0] : 'path/to/your/default/image.jpg';
//   }

//   viewProduct(productId: string): void {
//     this.router.navigate(['/product', productId]);
//   }

//   checkWishlistStatus(): void {
//     this.wishlistService.getWishlist().subscribe({
//       next: (response) => {
//         response.wishlist.forEach((item: any) => {
//           this.addedToWishlist[item.product._id] = true;
//         });
//       },
//       error: (error) => {
//         console.error('Error fetching wishlist:', error);
//       }
//     });
//   }

//   addToWishlist(productId: string): void {
//     this.wishlistService.addToWishlist(productId).subscribe({
//       next: () => {
//         this.addedToWishlist[productId] = true;
//         alert('Product added to your wishlist!');
//       },
//       error: () => {
//         alert('Failed to add product to wishlist. Please try again.');
//       },
//     });
//   }

//   removeFromWishlist(productId: string): void {
//     this.wishlistService.removeFromWishlist(productId).subscribe({
//       next: () => {
//         this.addedToWishlist[productId] = false;
//         alert('Product removed from your wishlist!');
//       },
//       error: () => {
//         alert('Failed to remove product from wishlist. Please try again.');
//       },
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../Services/products.service';
// import { WishlistService } from '../../Services/wishlist.service';
// import { Product } from '../../Models/product';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products: Product[] = [];
//   addedToWishlist: { [key: string]: boolean } = {};
//   keyword: string = '';
//   currentPage: number = 1;
//   totalPages: number = 0;
//   limit: number = 4; // You can adjust this based on how many products you want per page

//   constructor(
//     private productService: ProductService, 
//     private wishlistService: WishlistService, 
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.fetchProducts();
//     this.checkWishlistStatus();
//   }

//   fetchProducts(): void {
//     // Adjusted to use pagination and optionally search
//     const fetchObservable = this.keyword.trim() ?
//       this.productService.searchProducts(this.keyword, this.currentPage, this.limit) :
//       this.productService.getPaginatedProducts(this.currentPage, this.limit);

//     fetchObservable.subscribe({
//       next: (data) => {
//         this.products = data.products;
//         this.totalPages = data.totalPages;
//         // Adjust image URLs and subscriptions
//         this.products = this.products.map((product: any) => ({
//           ...product,
//           images: product.images.map((image: string) => 'http://localhost:3000/' + image.replace(/\\/g, '/')),
//           subscriptions: product.subscriptions.length ? product.subscriptions : [{ monthlyPrice: 'N/A', duration: 'N/A' }]
//         }));
//       },
//       error: (error) => console.error('Error fetching products:', error)
//     });
//   }

//   onPageChange(page: number): void {
//     this.currentPage = page;
//     this.fetchProducts();
//   }

//   onSearch(): void {
//     this.currentPage = 1; // Reset to first page for a new search
//     this.fetchProducts();
//   }

//   getImageUrl(images: string[]): string {
//     return images && images.length > 0 ? images[0] : 'path/to/your/default/image.jpg';
//   }

//   viewProduct(productId: string): void {
//     this.router.navigate(['/product', productId]);
//   }

//   checkWishlistStatus(): void {
//     this.wishlistService.getWishlist().subscribe({
//       next: (response) => {
//         response.wishlist.forEach((item: any) => {
//           this.addedToWishlist[item.product._id] = true;
//         });
//       },
//       error: (error) => {
//         console.error('Error fetching wishlist:', error);
//       }
//     });
//   }

//   addToWishlist(productId: string): void {
//     this.wishlistService.addToWishlist(productId).subscribe({
//       next: () => {
//         this.addedToWishlist[productId] = true;
//         alert('Product added to your wishlist!');
//       },
//       error: () => {
//         alert('Failed to add product to wishlist. Please try again.');
//       },
//     });
//   }

//   removeFromWishlist(productId: string): void {
//     this.wishlistService.removeFromWishlist(productId).subscribe({
//       next: () => {
//         this.addedToWishlist[productId] = false;
//         alert('Product removed from your wishlist!');
//       },
//       error: () => {
//         alert('Failed to remove product from wishlist. Please try again.');
//       },
//     });
//   }
// }








import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/products.service';
import { WishlistService } from '../../Services/wishlist.service';
import { Product } from '../../Models/product';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 4; 
  paginationNumbers: number[] = [];
  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService, 
              private wishlistService: WishlistService, 
              private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.checkWishlistStatus(); 
    this.setupSearch();
  }

  setupSearch(): void {
    this.searchTerms.pipe(
      debounceTime(300),       // wait 300ms after each keystroke before considering the term
      distinctUntilChanged()   // ignore if next search term is same as previous
    ).subscribe(keyword => {
      this.keyword = keyword;
      this.onSearch();
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  } 
  
  fetchProducts(): void {
    const fetchObservable = this.keyword.trim() ?
    this.productService.searchProducts(this.keyword, this.currentPage, this.limit) :
    this.productService.getPaginatedProducts(this.currentPage, this.limit);

    fetchObservable.subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
        this.updatePaginationNumbers();
        this.products = this.products.map((product: any) => ({
          ...product,
          images: product.images.map((image: string) => 'http://localhost:3000/' + image.replace(/\\/g, '/')),
          subscriptions: product.subscriptions.length ? product.subscriptions : [{ monthlyPrice: 'N/A', duration: 'N/A' }]
        }));
      },
      error: (error) => console.error('Error fetching products:', error)
    });
  }
  updatePaginationNumbers(): void {
    this.paginationNumbers = Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  
  onSearch(): void {
    this.currentPage = 1; // Reset to the first page on new search
    this.fetchProducts();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Out of range
    }
    this.currentPage = page;
    this.fetchProducts();
  }

  getImageUrl(images: string[]): string {
    return images && images.length > 0 ? images[0] : 'path/to/your/default/image.jpg';
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  checkWishlistStatus(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        response.wishlist.forEach((item: any) => {
          this.addedToWishlist[item.product._id] = true;
        });
      },
      error: (error) => {
        console.error('Error fetching wishlist:', error);
      }
    });
  }

  addToWishlist(productId: string): void {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this.addedToWishlist[productId] = true;
        alert('Product added to your wishlist!');
      },
      error: () => {
        alert('Failed to add product to wishlist. Please try again.');
      },
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.addedToWishlist[productId] = false;
        alert('Product removed from your wishlist!');
      },
      error: () => {
        alert('Failed to remove product from wishlist. Please try again.');
      },
    });
  }
}
