// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../../../Services/products.service'; // Adjust the path as necessary
// import { Product } from '../../../../Models/product';

// @Component({
//   selector: 'app-products-tab',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsTabComponent implements OnInit {
//   products: Product[] = [];
//   isLoading: boolean = true;

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.isLoading = true;
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

//   deleteProduct(productId: string): void {
//     if (confirm('Are you sure you want to delete this product?')) {
//       this.productService.deleteProduct(productId).subscribe({
//         next: () => {
//           alert('Product successfully deleted.');
//           this.loadProducts(); // Reload products to reflect the deletion
//         },
//         error: (error) => {
//           console.error('Failed to delete product:', error);
//           alert('Failed to delete the product. Please try again.');
//         }
//       });
//     }
//   }

//   updateProduct(productId: string, productData: Product): void {
//     // Placeholder function for updating a product
//     console.log('Updating product:', productData);
//     // Add logic to open a modal or navigate to the product edit form
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../../../Services/products.service';
// import { Product } from '../../../../Models/product';

// @Component({
//   selector: 'app-products-tab',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsTabComponent implements OnInit {
//   products: Product[] = [];
//   isLoading: boolean = true;
//   baseUrl: string = 'http://localhost:3000/'; 

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.isLoading = true;
//     this.productService.getAllProducts().subscribe({
//       next: (products) => {
//         this.products = products.map(product => ({
//           ...product,
//           images: product.images.map(image => 
//             `${this.baseUrl}${image.replace(/\\/g, '/')}`
//           ),
//         }));
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching products:', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   deleteProduct(productId: string): void {
//     // Implementation remains the same as provided
//   }

//   updateProduct(productId: string, productData: Product): void {
//     // Implementation remains the same as provided
//   }

//   getImageUrl(images: string[]): string {
//     return images.length > 0 ? images[0] : 'https://via.placeholder.com/150';
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
//   products: Product[] = [];
//   editForm!: FormGroup;
//   isEditing: boolean = false;
//   currentEditingProduct: Product | null = null;

//   constructor(
//     private productService: ProductService,
//     private fb: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.productService.getAllProducts().subscribe(products => {
//       this.products = products;
//     });
//   }

//   initializeForm(product: Product): void {
//     this.editForm = this.fb.group({
//       name: [product.name, Validators.required],
//       brand: [product.brand, Validators.required],
//       category: [product.category, Validators.required],
//       image: [product.images], 
//       subscriptions: this.fb.array(product.subscriptions.map((subscription:any) => this.createSubscriptionGroup(subscription))),
//       stock: [product.stock, [Validators.required, Validators.min(0)]]
//     });
//   }

//   createSubscriptionGroup(subscription?: any): FormGroup {
//     return this.fb.group({
//       duration: [subscription?.duration || '', Validators.required],
//       monthlyPrice: [subscription?.monthlyPrice || '', [Validators.required, Validators.min(0)]]
//     });
//   }

//   get subscriptionsFormArray(): FormArray {
//     return this.editForm.get('subscriptions') as FormArray;
//   }

//   editProduct(product: Product): void {
//     this.currentEditingProduct = product;
//     this.isEditing = true;
//     this.initializeForm(product);
//   }

//   updateProduct(): void {
//     if (this.editForm.valid && this.currentEditingProduct) {
//       this.productService.updateProduct(this.currentEditingProduct._id, this.editForm.value)
//         .subscribe({
//           next: (updatedProduct) => {
//             this.isEditing = false;
//             this.currentEditingProduct = null;
//             this.loadProducts(); // reload the products to show the updated list
//           },
//           error: (error) => console.error('Error updating product:', error)
//         });
//     }
//   }

//   cancelEdit(): void {
//     this.isEditing = false;
//     this.currentEditingProduct = null;
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
//   isLoading = true; // Changed to not use the 'boolean' type explicitly
//   products: Product[] = [];
//   editForm!: FormGroup; // Initialized using the definite assignment assertion
//   isEditing = false;
//   isAddMode: boolean = false;
//   currentEditingProduct: Product | null = null;
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
//         this.products = products.map(product => ({
//           ...product,
//           images: product.images.map(image => `${this.baseUrl}${image.replace(/\\/g, '/')}`),
//         }));
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching products:', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   initializeForm(product: Product): void {
//     this.editForm = this.fb.group({
//       name: [product.name || '', Validators.required],
//       brand: [product.brand ?? '', Validators.required],
//       category: [product.category ?? '', Validators.required],
//       image: [product.images ? product.images[0] : '', Validators.required],
//       subscriptions: this.fb.array(product.subscriptions ? product.subscriptions.map((subscription: any) => this.createSubscriptionGroup(subscription)) : []),
//       stock: [product.stock || '', [Validators.required, Validators.min(0)]]
//     });
//   }

//   createSubscriptionGroup(subscription?: any): FormGroup {
//     return this.fb.group({
//       duration: [subscription?.duration || '', Validators.required],
//       monthlyPrice: [subscription?.monthlyPrice || '', [Validators.required, Validators.min(0)]]
//     });
//   }

//   get subscriptionsFormArray(): FormArray {
//     return this.editForm.get('subscriptions') as FormArray;
//   }

//   editProduct(product: Product): void {
//     this.currentEditingProduct = product;
//     this.isEditing = true;
//     this.initializeForm(product);
//   }

//   updateProduct(): void {
//     if (this.editForm.valid && this.currentEditingProduct) {
//       this.productService.updateProductAdmin(this.currentEditingProduct._id, this.editForm.value)
//         .subscribe({
//           next: () => {
//             this.isEditing = false;
//             this.currentEditingProduct = null;
//             this.loadProducts(); 
//           },
//           error: (error) => console.error('Error updating product:', error)
//         });
//     }
//   }

//   cancelEdit(): void {
//     this.isEditing = false;
//     this.currentEditingProduct = null;
//   }

//   deleteProduct(productId: string): void {
//     this.productService.deleteProduct(productId).subscribe({
//       next: () => {
//         this.loadProducts(); 
//       },
//       error: (error) => {
//         console.error('Failed to delete product:', error);
//       }
//     });
//   }

//   getImageUrl(images: string[]): string {
//     return images.length > 0 ? images[0] : 'https://via.placeholder.com/150';
//   }

//   prepareAddProduct(): void {
//     this.isAddMode = true;
//     this.isEditing = false;
//     this.currentEditingProduct = null;
//     this.initializeForm({} as Product); // Initialize the form with empty values
//   }

//   submitForm(): void {
//     if (this.isAddMode) {
//       this.productService.createProduct(this.editForm.value).subscribe({
//         next: () => this.loadProducts(),
//         error: (error) => console.error('Error creating product:', error)
//       });
//     } else {
//       this.updateProduct();
//     }
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
//   isLoading = true; // Changed to not use the 'boolean' type explicitly
//   products: Product[] = [];
//   editForm!: FormGroup; // Initialized using the definite assignment assertion
//   isEditing = false;
//   isAddMode: boolean = false;
//   currentEditingProduct: Product | null = null;
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
//         this.products = products.map(product => ({
//           ...product,
//           images: product.images.map(image => `${this.baseUrl}${image.replace(/\\/g, '/')}`),
//         }));
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching products:', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   initializeForm(product: Product): void {
//     this.editForm = this.fb.group({
//       name: [product.name || '', Validators.required],
//       brand: [product.brand ?? '', Validators.required],
//       category: [product.category ?? '', Validators.required],
//       image: [product.images ? product.images[0] : '', Validators.required],
//       subscriptions: this.fb.array(product.subscriptions ? product.subscriptions.map((subscription: any) => this.createSubscriptionGroup(subscription)) : []),
//       stock: [product.stock || '', [Validators.required, Validators.min(0)]]
//     });
//   }

//   createSubscriptionGroup(subscription?: any): FormGroup {
//     return this.fb.group({
//       duration: [subscription?.duration || '', Validators.required],
//       monthlyPrice: [subscription?.monthlyPrice || '', [Validators.required, Validators.min(0)]]
//     });
//   }

//   get subscriptionsFormArray(): FormArray {
//     return this.editForm.get('subscriptions') as FormArray;
//   }

//   editProduct(product: Product): void {
//     this.currentEditingProduct = product;
//     this.isEditing = true;
//     this.initializeForm(product);
//   }

//   updateProduct(): void {
//     if (this.editForm.valid && this.currentEditingProduct) {
//       this.productService.updateProductAdmin(this.currentEditingProduct._id, this.editForm.value)
//         .subscribe({
//           next: () => {
//             this.isEditing = false;
//             this.currentEditingProduct = null;
//             this.loadProducts(); 
//           },
//           error: (error) => console.error('Error updating product:', error)
//         });
//     }
//   }

//   cancelEdit(): void {
//     this.isEditing = false;
//     this.currentEditingProduct = null;
//   }

//   deleteProduct(productId: string): void {
//     this.productService.deleteProduct(productId).subscribe({
//       next: () => {
//         this.loadProducts(); 
//       },
//       error: (error) => {
//         console.error('Failed to delete product:', error);
//       }
//     });
//   }

//   getImageUrl(images: string[]): string {
//     return images.length > 0 ? images[0] : 'https://via.placeholder.com/150';
//   }

//   prepareAddProduct(): void {
//     this.isAddMode = true;
//     this.isEditing = false;
//     this.currentEditingProduct = null;
//     this.initializeForm({} as Product); // Initialize the form with empty values
//   }

//   submitForm(): void {
//     if (this.isAddMode) {
//       this.productService.createProduct(this.editForm.value).subscribe({
//         next: () => this.loadProducts(),
//         error: (error) => console.error('Error creating product:', error)
//       });
//     } else {
//       this.updateProduct();
//     }
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
//         this.products = products.map(product => ({
//           ...product,
//           images: product.images.map(image => `${this.baseUrl}${image.replace(/\\/g, '/')}`),
//         }));
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
//       brand: [product.brand ?? '', Validators.required],
//       category: [product.category ?? '', Validators.required],
//       image: [product.images ? product.images[0] : '', Validators.required],
//       subscriptions: this.fb.array(product.subscriptions ? product.subscriptions.map((subscription: any) => this.createSubscriptionGroup(subscription)) : this.fb.array([])),
//       stock: [product.stock || '', [Validators.required, Validators.min(0)]]
//     });
//   }

//   createSubscriptionGroup(subscription: any = {duration: '', monthlyPrice: ''}): FormGroup {
//     return this.fb.group({
//       duration: [subscription.duration, Validators.required],
//       monthlyPrice: [subscription.monthlyPrice, [Validators.required, Validators.min(0)]]
//     });
//   }

//   get subscriptionsFormArray(): FormArray {
//     return this.editForm.get('subscriptions') as FormArray;
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

//   submitForm(): void {
//     if (this.isAddMode) {
//       this.productService.createProduct(this.editForm.value).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.cancelEdit();
//         },
//         error: (error) => console.error('Error creating product:', error)
//       });
//     } else if (this.currentEditingProduct) {
//       this.productService.updateProductAdmin(this.currentEditingProduct._id, this.editForm.value).subscribe({
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
//     return images.length > 0 ? images[0] : 'https://via.placeholder.com/150';
//   }
// }


import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  selectedFile: File | null = null;
  baseUrl: string = 'http://localhost:3000/';

  @ViewChild('fileInput') fileInput!: ElementRef;

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
        this.products = products.map(product => ({
          ...product,
          images: product.images.map(image => `${this.baseUrl}${image.replace(/\\/g, '/')}`),
        }));
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
      brand: [product.brand ?? '', Validators.required],
      category: [product.category ?? '', Validators.required],
      image: [product.images ? product.images[0] : '', Validators.required],
      subscriptions: this.fb.array(product.subscriptions ? product.subscriptions.map((subscription: any) => this.createSubscriptionGroup(subscription)) : []),
      stock: [product.stock || '', [Validators.required, Validators.min(0)]]
    });
  }

  createSubscriptionGroup(subscription: any = { duration: '', monthlyPrice: '' }): FormGroup {
    return this.fb.group({
      duration: [subscription.duration, Validators.required],
      monthlyPrice: [subscription.monthlyPrice, [Validators.required, Validators.min(0)]]
    });
  }

  get subscriptionsFormArray(): FormArray {
    return this.editForm.get('subscriptions') as FormArray;
  }

  addSubscription(): void {
    const subscriptionFG = this.createSubscriptionGroup();
    this.subscriptionsFormArray.push(subscriptionFG);
  }

  removeSubscription(index: number): void {
    this.subscriptionsFormArray.removeAt(index);
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

  handleFileInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;

    if (files && files.length > 0) {
      // Handle the file(s) here. For example, setting the first file to a component property
      this.selectedFile = files[0]; // Assuming you have a selectedFile property in your component
      // Process or upload the file as needed
    } else {
      // Handle the case where no file was selected
    }
  }

  submitForm(): void {
    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('brand', this.editForm.value.brand);
    formData.append('category', this.editForm.value.category);
    formData.append('stock', this.editForm.value.stock);
    if (this.selectedFile) {
      formData.append('images', this.selectedFile);
    }
    // Append subscriptions as JSON
    const subtemp = [{
      duration: '2',
      monthlyPrice: '200'
    }]
    
    formData.append('subscriptions', subtemp);
    console.log(typeof(this.editForm.value.subscriptions[0]));
      //  formData.append('subscriptions', this.editForm.value.subscriptions);
    if (this.isAddMode) {
      console.log(formData)
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelEdit();
        },
        error: (error) => console.error('Error creating product:', error)
      });
    } else if (this.currentEditingProduct) {
      // Assuming your service has a method to update the product with FormData
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
    return images.length > 0 ? images[0] : 'https://via.placeholder.com/150';
  }
}
