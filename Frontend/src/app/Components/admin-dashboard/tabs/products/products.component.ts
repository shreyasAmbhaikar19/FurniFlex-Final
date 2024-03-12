import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Services/products.service'; // Adjust the path as necessary
import { Product } from '../../../../Models/product';

@Component({
  selector: 'app-products-tab',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsTabComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products; 
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          alert('Product successfully deleted.');
          this.loadProducts(); // Reload products to reflect the deletion
        },
        error: (error) => {
          console.error('Failed to delete product:', error);
          alert('Failed to delete the product. Please try again.');
        }
      });
    }
  }

  updateProduct(productId: string, productData: Product): void {
    // Placeholder function for updating a product
    console.log('Updating product:', productData);
    // Add logic to open a modal or navigate to the product edit form
  }
}
