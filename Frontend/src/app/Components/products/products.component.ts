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
  price:any;

  constructor( private productService: ProductService, 
    private wishlistService: WishlistService, 
    private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.checkWishlistStatus();
   
    
  }

  fetchProducts(): void {
    const fetchObservable = this.keyword.trim() ?
      this.productService.searchProducts(this.keyword) :
      this.productService.getAllProducts();

    fetchObservable.subscribe(data => {
      const fetchedProducts = 'success' in data ? data.products : data; 
      console.log(fetchedProducts);
      
      // this.price=JSON.parse(fetchedProducts.subscription);
      this.products = fetchedProducts.map((product: Product) => ({
        ...product,
        images: product.images.map((image: string) => this.baseUrl + image.replace(/\\/g, '/'))
      }));
      for(let i=0;i<this.products.length;i++){
        this.products[i].subscriptions=JSON.parse(this.products[i].subscriptions)
        console.log(this.products[i].subscriptions);
      }
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










