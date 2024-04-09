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
//   existingImages: string[] = [];
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
//     this.existingImages = product.images || [];
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
//     this.subscriptionsFormArray.push(this.createSubscriptionGroup());
//   }

//   removeSubscription(index: number): void {
//     this.subscriptionsFormArray.removeAt(index);
//   }

//   handleFileInput(event: any): void {
//     this.selectedFiles = Array.from(event.target.files);
//   }

//   removeExistingImage(index: number): void {
//     this.existingImages.splice(index, 1);
//   }

//   submitForm(): void {
//     const formData = new FormData();
//     formData.append('name', this.editForm.value.name);
//     formData.append('description', this.editForm.value.description);
//     formData.append('brand', this.editForm.value.brand);
//     formData.append('category', this.editForm.value.category);
//     formData.append('stock', this.editForm.value.stock.toString());
//     formData.append('subscriptions', JSON.stringify(this.subscriptionsFormArray.value));
//     this.selectedFiles.forEach(file => formData.append('newImages', file));
//     formData.append('existingImages', JSON.stringify(this.existingImages));

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
//     this.existingImages = [];
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
//     if (images && images.length > 0) {
//       return `${this.baseUrl}${images[0]}`;
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
//   existingImages: string[] = [];
//   imagePreviews: string[] = [];
//   baseUrl: string = 'http://localhost:3000/';

//   constructor(private productService: ProductService, private fb: FormBuilder) {}

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
//     this.existingImages = product.images || [];
//     this.imagePreviews = this.existingImages.map(image => `${this.baseUrl}${image}`);
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
//     this.subscriptionsFormArray.push(this.createSubscriptionGroup());
//   }

//   removeSubscription(index: number): void {
//     this.subscriptionsFormArray.removeAt(index);
//   }

//   handleFileInput(event: any): void {
//     const files: FileList = event.target.files;
//     this.selectedFiles = Array.from(files);
  
//     Array.from(files).forEach((file: File) => { // Explicitly typing `file` as `File`
//       const reader = new FileReader();
//       reader.onload = (e: any) => this.imagePreviews.push(e.target.result as string); // Assuring `e.target.result` is a string
//       reader.readAsDataURL(file);
//     });
//   }

//   submitForm(): void {
//     if (!this.editForm.valid) {
//       return; 
//     }
    
//     const formData = new FormData();
//     formData.append('name', this.editForm.value.name);
//     formData.append('description', this.editForm.value.description);
//     formData.append('brand', this.editForm.value.brand);
//     formData.append('category', this.editForm.value.category);
//     formData.append('stock', this.editForm.value.stock.toString());
//     formData.append('subscriptions', JSON.stringify(this.subscriptionsFormArray.value));

//     this.selectedFiles.forEach((file, index) => {
//       formData.append('images', file, file.name);
//     });

//     formData.append('existingImages', JSON.stringify(this.existingImages));

//     if (this.isAddMode) {
//       this.productService.createProduct(formData).subscribe({
//         next: () => this.afterProductModification(),
//         error: (error) => console.error('Error creating product:', error)
//       });
//     } else if (this.currentEditingProduct) {
//       this.productService.updateProductAdmin(this.currentEditingProduct._id, formData).subscribe({
//         next: () => this.afterProductModification(),
//         error: (error) => console.error('Error updating product:', error)
//       });
//     }
//   }

//   afterProductModification(): void {
//     this.loadProducts();
//     this.cancelEdit();
//   }

//   editProduct(product: Product): void {
//     this.isEditing = true;
//     this.isAddMode = false;
//     this.currentEditingProduct = product;
//     this.initializeForm(product);
    
//   }

//   prepareAddProduct(): void {
//     this.isAddMode = true;
//     this.isEditing = false;
//     this.currentEditingProduct = null;
//     this.initializeForm();
//   }

//   cancelEdit(): void {
//     this.isEditing = false;
//     this.isAddMode = false;
//     this.currentEditingProduct = null;
//     this.editForm.reset();
//     this.selectedFiles = [];
//     this.existingImages = [];
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
//     if (images && images.length > 0) {
//       const correctedPath = images[0].replace(/\\/g, '/');
//       return `${this.baseUrl}${correctedPath}`;
//     }
//     return 'https://via.placeholder.com/150';
//   }

//   removeImage(index: number): void {
//         // Remove from imagePreviews
//     this.imagePreviews.splice(index, 1);

//     // Check if the index is within the range of existing images
//     if (index < this.existingImages.length) {
//       // If the image is an existing one, remove it from existingImages
//       this.existingImages.splice(index, 1);
//     } else {
//       // If the image is a new upload, calculate its index in selectedFiles and remove it
//       const fileIndex = index - this.existingImages.length;
//       this.selectedFiles.splice(fileIndex, 1);
//     }
//   }
// }







import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../../../Services/products.service'; 
import { Product } from '../../../../Models/product';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'], 
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
  imagePreviews: string[] = [];
  baseUrl: string = 'http://localhost:3000/';

  keyword: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  limit: number = 4;
  paginationNumbers: number[] = [];

  private searchTerms = new Subject<string>();


  constructor(private productService: ProductService, private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
     this.searchTerms.pipe(
      debounceTime(500),      
      distinctUntilChanged()  
    ).subscribe(keyword => {
      this.keyword = keyword;
      this.loadProducts(true);
    });
  }
  
  search(keyword: string): void {
    this.searchTerms.next(keyword);
  }

  openDeleteDialog(productName: string, productId: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Deleting Product',
        message: `Are you sure you want to delete the product ${productName}?`,
        confirmText: 'Yes, delete the product',
        cancelText: 'Cancel, keep the product'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }
  
  loadProducts(isSearchOperation: boolean = false): void {
    this.isLoading = true;
    const operationObservable = isSearchOperation ?
      this.productService.searchProducts(this.keyword, this.currentPage, this.limit) :
      this.productService.getPaginatedProducts(this.currentPage, this.limit);

    operationObservable.subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalPages = response.totalPages; 
        this.updatePaginationNumbers();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  updatePaginationNumbers(): void {
    this.paginationNumbers = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  searchProducts(): void {
    this.currentPage = 1;
    this.loadProducts(true);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProducts(this.keyword.length > 0);
  }

  initializeForm(product: Product = {} as Product): void {
    const textOnlyRegex = /^[a-zA-Z\s,.'-]+$/;

    this.editForm = this.fb.group({
      name: [product.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]], 
      description: [product.description || '', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      brand: [product.brand ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]], 
      category: [product.category ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(textOnlyRegex)]],
      stock: [product.stock || 1, [Validators.required, Validators.min(1), Validators.max(10000)]], 
      subscriptions: this.fb.array(
        product.subscriptions
        ? product.subscriptions.map((subscription: any) => this.createSubscriptionGroup(subscription))
        : []
        ),
      discount: [product.discount || 0, [Validators.required, Validators.min(0), Validators.max(100)]], 
    });
    this.existingImages = product.images || [];
    this.imagePreviews = this.existingImages.map(image => `${this.baseUrl}${image}`);
  }

  createSubscriptionGroup(subscription: any = { duration: '', monthlyPrice: '' }): FormGroup {
    return this.fb.group({
      duration: [subscription.duration, [Validators.required, Validators.min(1), Validators.max(36)]],
      monthlyPrice: [subscription.monthlyPrice, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], 
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
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  
    Array.from(files).forEach((file: File) => { 
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result as string); // Assuring `e.target.result` is a string
      reader.readAsDataURL(file);
    });
  }

  submitForm(): void {
    if (!this.editForm.valid) {
      return; 
    }
    
    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('description', this.editForm.value.description);
    formData.append('brand', this.editForm.value.brand);
    formData.append('category', this.editForm.value.category);
    formData.append('stock', this.editForm.value.stock.toString());
    formData.append('subscriptions', JSON.stringify(this.subscriptionsFormArray.value));
    formData.append('discount', this.editForm.value.discount.toString());

    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file, file.name);
    });

    formData.append('existingImages', JSON.stringify(this.existingImages));

    if (this.isAddMode) {
      this.productService.createProduct(formData).subscribe({
        next: () => this.afterProductModification(),
        error: (error) => console.error('Error creating product:', error)
      });
    } else if (this.currentEditingProduct) {
      this.productService.updateProductAdmin(this.currentEditingProduct._id, formData).subscribe({
        next: () => this.afterProductModification(),
        error: (error) => console.error('Error updating product:', error)
      });
    }
  }

  afterProductModification(): void {
    this.loadProducts();
    this.cancelEdit();
  }

  editProduct(product: Product): void {
    this.isEditing = true;
    this.isAddMode = false;
    this.currentEditingProduct = product;
    this.initializeForm(product);
    
  }

  prepareAddProduct(): void {
    this.isAddMode = true;
    this.isEditing = false;
    this.currentEditingProduct = null;
    this.initializeForm();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.isAddMode = false;
    this.currentEditingProduct = null;
    this.editForm.reset();
    this.selectedFiles = [];
    this.existingImages = [];
  }

  private deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error) => console.error('Failed to delete product:', error)
    });
  }

  getImageUrl(images: string[]): string {
    if (images && images.length > 0) {
      const correctedPath = images[0].replace(/\\/g, '/');
      return `${this.baseUrl}${correctedPath}`;
    }
    return 'https://via.placeholder.com/150';
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    if (index < this.existingImages.length) {
      this.existingImages.splice(index, 1);
    } else {
      const fileIndex = index - this.existingImages.length;
      this.selectedFiles.splice(fileIndex, 1);
    }
  }
}