// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
// import { ProductService } from '../../../../Services/products.service';
// import { Product } from '../../../../Models/product';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsTabComponent implements OnInit {
//   isLoading: boolean = true;
//   products: Product[] = [];
//   editForm!: FormGroup;
//   isEditing: boolean = false;
//   isAddMode: boolean = false;
//   currentEditingProduct: Product | null = null;
//   selectedFiles: File[] = [];
//   baseUrl: string = 'http://localhost:3000/';

//   constructor(
//     private productService: ProductService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.productService.getAllProducts().subscribe({
//       next: (products) => {
//         this.products = products;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching products:', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   initializeForm(product: Product = {} as Product): void {
//     this.editForm = this.fb.group({
//       name: [product.name || '', Validators.required],
//       description: [product.description || '', Validators.required],
//       brand: [product.brand || '', Validators.required],
//       category: [product.category || '', Validators.required],
//       stock: [product.stock || 1, [Validators.required, Validators.min(1)]],
//       subscriptions: this.fb.array(product.subscriptions ? product.subscriptions.map((subscription: any) => this.createSubscriptionGroup(subscription)) : [])
//     });
//   }

//   createSubscriptionGroup(subscription: any = { duration: '', monthlyPrice: '' }): FormGroup {
//     return this.fb.group({
//       duration: [subscription.duration, Validators.required],
//       monthlyPrice: [subscription.monthlyPrice, Validators.required]
//     });
//   }

//   get subscriptionsFormArray(): FormArray {
//     return this.editForm.get('subscriptions') as FormArray;
//   }

//   addSubscription(): void {
//     const subscriptionFG = this.createSubscriptionGroup();
//     this.subscriptionsFormArray.push(subscriptionFG);
//   }

//   removeSubscription(index: number): void {
//     this.subscriptionsFormArray.removeAt(index);
//   }

//   handleFileInput(event: any): void {
//     this.selectedFiles = Array.from(event.target.files);
//   }

//   submitForm(): void {
//     const formData = new FormData();
//     formData.append('name', this.editForm.value.name);
//     formData.append('description', this.editForm.value.description);
//     formData.append('brand', this.editForm.value.brand);
//     formData.append('category', this.editForm.value.category);
//     formData.append('stock', this.editForm.value.stock.toString());

//     this.selectedFiles.forEach(file => {
//       formData.append('images', file);
//     });

//     formData.append('subscriptions', JSON.stringify(this.subscriptionsFormArray.value));
    

//     if (this.isAddMode) {
//       this.productService.createProduct(formData).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.cancelEdit();
//         },
//         error: (error) => console.error('Error creating product:', error)
//       });
//     } else if (this.currentEditingProduct) {
//       this.productService.updateProductAdmin(this.currentEditingProduct._id, formData).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.cancelEdit();
//         },
//         error: (error) => console.error('Error updating product:', error)
//       });
//     }
//   }

//   cancelEdit(): void {
//     this.isEditing = false;
//     this.isAddMode = false;
//     this.currentEditingProduct = null;
//     this.editForm.reset();
//     this.selectedFiles = [];
//   }

//   editProduct(product: Product): void {
//     this.currentEditingProduct = product;
//     this.isEditing = true;
//     this.isAddMode = false;
//     this.initializeForm(product);
//   }

//   prepareAddProduct(): void {
//     this.isAddMode = true;
//     this.isEditing = false;
//     this.currentEditingProduct = null;
//     this.initializeForm();
//   }

//   deleteProduct(productId: string): void {
//     this.productService.deleteProduct(productId).subscribe({
//       next: () => {
//         this.loadProducts();
//       },
//       error: (error) => console.error('Failed to delete product:', error)
//     });
//   }

//   getImageUrl(images: string[]): string {
//     if (images.length > 0) {
//         return `http://localhost:3000/${images[0]}`;
//     }
//     return 'https://via.placeholder.com/150';
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
// import { ProductService } from '../../../../Services/products.service';
// import { Product } from '../../../../Models/product';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsTabComponent implements OnInit {
//   isLoading: boolean = true;
//   products: Product[] = [];
//   editForm!: FormGroup;
//   isEditing: boolean = false;
//   isAddMode: boolean = false;
//   currentEditingProduct: Product | null = null;
//   selectedFiles: File[] = [];
//   baseUrl: string = 'http://localhost:3000/';

//   constructor(
//     private productService: ProductService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.productService.getAllProducts().subscribe({
//       next: (products) => {
//         this.products = products;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching products:', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   initializeForm(product: Product = {} as Product): void {
//     this.editForm = this.fb.group({
//       name: [product.name || '', Validators.required],
//       description: [product.description || '', Validators.required],
//       brand: [product.brand || '', Validators.required],
//       category: [product.category || '', Validators.required],
//       stock: [product.stock || 1, [Validators.required, Validators.min(1)]],
//       subscriptions: this.fb.array(product.subscriptions ? product.subscriptions.map((subscription:any) => this.createSubscriptionGroup(subscription)) : [])
//     });
//   }

//   createSubscriptionGroup(subscription: any = { duration: '', monthlyPrice: '' }): FormGroup {
//     return this.fb.group({
//       duration: [subscription.duration, Validators.required],
//       monthlyPrice: [subscription.monthlyPrice, Validators.required]
//     });
//   }

//   get subscriptionsFormArray(): FormArray {
//     return this.editForm.get('subscriptions') as FormArray;
//   }

//   addSubscription(): void {
//     const subscriptionFG = this.createSubscriptionGroup();
//     this.subscriptionsFormArray.push(subscriptionFG);
//   }

//   removeSubscription(index: number): void {
//     this.subscriptionsFormArray.removeAt(index);
//   }

//   handleFileInput(event: any): void {
//     this.selectedFiles = Array.from(event.target.files);
//   }

//   submitForm(): void {
//     const formData = new FormData();
//     formData.append('name', this.editForm.value.name);
//     formData.append('description', this.editForm.value.description);
//     formData.append('brand', this.editForm.value.brand);
//     formData.append('category', this.editForm.value.category);
//     formData.append('stock', this.editForm.value.stock.toString());

//     this.selectedFiles.forEach(file => {
//       formData.append('images', file);
//     });
//     formData.append('subscriptions', JSON.stringify(this.subscriptionsFormArray.value));

//     if (this.isAddMode) {
//       this.productService.createProduct(formData).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.cancelEdit();
//         },
//         error: (error) => console.error('Error creating product:', error)
//       });
//     } 

//     else if (this.currentEditingProduct) {
//       this.productService.updateProductAdmin(this.currentEditingProduct._id, formData).subscribe({
//         next: () => {
//           alert('Product updated successfully.');
//           this.loadProducts();
//           this.cancelEdit();
//         },
//         error: (error) => {
//           console.error('Error updating product:', error);
//           alert('There was an error updating the product.');
//         }
//       });
//     }
//   }

//   cancelEdit(): void {
//     this.isEditing = false;
//     this.isAddMode = false;
//     this.currentEditingProduct = null;
//     this.editForm.reset();
//     this.selectedFiles = [];
//   }

//   editProduct(product: Product): void {
//     this.currentEditingProduct = product;
//     this.isEditing = true;
//     this.isAddMode = false;
//     this.initializeForm(product);
//   }

//   prepareAddProduct(): void {
//     this.isAddMode = true;
//     this.isEditing = false;
//     this.currentEditingProduct = null;
//     this.initializeForm();
//   }

//   deleteProduct(productId: string): void {
//     this.productService.deleteProduct(productId).subscribe({
//       next: () => {
//         this.loadProducts();
//       },
//       error: (error) => console.error('Failed to delete product:', error)
//     });
//   }

//   getImageUrl(images: string[]): string {
//     if (images.length > 0) {
//       return `http://localhost:3000/${images[0]}`;
//     }
//     return 'https://via.placeholder.com/150';
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../../../Services/products.service';
import { Product } from '../../../../Models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsTabComponent implements OnInit {
  isLoading: boolean = true;
  products: Product[] = [];
  editForm!: FormGroup;
  isEditing: boolean = false;
  isAddMode: boolean = false;
  currentEditingProduct: Product | null = null;
  selectedFiles: File[] = [];
  existingImages: string[] = [];
  baseUrl: string = 'http://localhost:3000/';

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
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

  initializeForm(product: Product = {} as Product): void {
    this.editForm = this.fb.group({
      name: [product.name || '', Validators.required],
      description: [product.description || '', Validators.required],
      brand: [product.brand || '', Validators.required],
      category: [product.category || '', Validators.required],
      stock: [product.stock || 1, [Validators.required, Validators.min(1)]],
      subscriptions: this.fb.array(product.subscriptions ? product.subscriptions.map((subscription:any) => this.createSubscriptionGroup(subscription)) : [])
    });
    this.existingImages = product.images || [];
  }

  createSubscriptionGroup(subscription: any = { duration: '', monthlyPrice: '' }): FormGroup {
    return this.fb.group({
      duration: [subscription.duration, Validators.required],
      monthlyPrice: [subscription.monthlyPrice, Validators.required]
    });
  }

  get subscriptionsFormArray(): FormArray {
    return this.editForm.get('subscriptions') as FormArray;
  }

  addSubscription(): void {
    this.subscriptionsFormArray.push(this.createSubscriptionGroup());
  }

  removeSubscription(index: number): void {
    this.subscriptionsFormArray.removeAt(index);
  }

  handleFileInput(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  removeExistingImage(index: number): void {
    this.existingImages.splice(index, 1);
  }

  submitForm(): void {
    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('description', this.editForm.value.description);
    formData.append('brand', this.editForm.value.brand);
    formData.append('category', this.editForm.value.category);
    formData.append('stock', this.editForm.value.stock.toString());
    formData.append('subscriptions', JSON.stringify(this.subscriptionsFormArray.value));
    this.selectedFiles.forEach(file => formData.append('newImages', file));
    formData.append('existingImages', JSON.stringify(this.existingImages));

    if (this.isAddMode) {
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelEdit();
        },
        error: (error) => console.error('Error creating product:', error)
      });
    } else if (this.currentEditingProduct) {
      this.productService.updateProductAdmin(this.currentEditingProduct._id, formData).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelEdit();
        },
        error: (error) => console.error('Error updating product:', error)
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.isAddMode = false;
    this.currentEditingProduct = null;
    this.editForm.reset();
    this.selectedFiles = [];
    this.existingImages = [];
  }

  editProduct(product: Product): void {
    this.currentEditingProduct = product;
    this.isEditing = true;
    this.isAddMode = false;
    this.initializeForm(product);
  }

  prepareAddProduct(): void {
    this.isAddMode = true;
    this.isEditing = false;
    this.currentEditingProduct = null;
    this.initializeForm();
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error) => console.error('Failed to delete product:', error)
    });
  }

  getImageUrl(images: string[]): string {
    if (images && images.length > 0) {
      return `${this.baseUrl}${images[0]}`;
    }
    return 'https://via.placeholder.com/150';
  }
}
