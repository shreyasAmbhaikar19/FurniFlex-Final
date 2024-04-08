import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/products.service';
import { WishlistService } from '../../Services/wishlist.service';
import { Product } from '../../Models/product';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategoryService } from '../../Services/category.service';
import { initFlowbite } from 'flowbite';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  addedToWishlist: { [key: string]: boolean } = {};
  baseUrl: string = 'http://localhost:3000/';
  selectedCategory: string = ''; 
  keyword: string = '';
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 8; 
  paginationNumbers: number[] = [];
  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService, 
              private wishlistService: WishlistService, 
              private categoryService: CategoryService,
              private router: Router,
              private toast: NgToastService) { }

  ngOnInit(): void { 
    initFlowbite();
    this.fetchProducts();
    this.checkWishlistStatus(); 
    this.setupSearch();
    this.fetchCategories();
  }

  setupSearch(): void {
    this.searchTerms.pipe(
      debounceTime(500),       
      distinctUntilChanged() 
    ).subscribe(keyword => {
      this.keyword = keyword;
      this.onSearch();
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  } 

  fetchProducts(): void {
    let fetchObservable: Observable<any>;
    if (this.selectedCategory) {
      fetchObservable = this.productService.getProductsByCategory(this.selectedCategory, this.currentPage, this.limit);
      this.selectedCategory = ''; 
    } else {
      fetchObservable = this.keyword.trim() ?
        this.productService.searchProducts(this.keyword, this.currentPage, this.limit) :
        this.productService.getPaginatedProducts(this.currentPage, this.limit);
    }
  
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

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  updatePaginationNumbers(): void {
    this.paginationNumbers = Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  
  onSearch(): void {
    this.currentPage = 1; 
    this.selectedCategory = '';
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

  getCategoryImageUrl(image: string): string {
    if (image) {
      const correctedPath = image.replace(/\\/g, '/');
      return `${this.baseUrl}${correctedPath}`;
    }
    return 'https://via.placeholder.com/150';
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
        this.toast.success({detail:"SUCCESS", summary:'Product added to your wishlist!', duration:3000, position:'topRight'});
      },
      error: () => {
        this.toast.error({detail:"ERROR", summary:'Failed to add product to wishlist. Please try again.', duration:3000, position:'topRight'});
      },
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.addedToWishlist[productId] = false;
        this.toast.success({detail:"SUCCESS", summary:'Product removed from your wishlist!', duration:3000, position:'topRight'});
      },
      error: () => {
        this.toast.error({detail:"ERROR", summary:'Failed to remove product from wishlist. Please try again.', duration:3000, position:'topRight'});
      },
    });
  }

  toggleWishlist(productId: string, event: Event): void {
    event.stopPropagation(); 
  
    if (this.addedToWishlist[productId]) {
      this.removeFromWishlist(productId);
    } else {
      this.addToWishlist(productId);
    }
  }

  filterByCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.fetchProducts();
  }
}
