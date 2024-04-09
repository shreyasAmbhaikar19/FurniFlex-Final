// Import all the necessary dependencies at the top of the file
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../../Services/products.service'; 
import { Product } from '../../../../../Services/products.service';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.css']
})
export class ProductFormDialogComponent implements OnInit {
  editForm!: FormGroup;
  isAddMode: boolean;
  existingImages: string[] = [];
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  baseUrl: string = 'http://localhost:3000/';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null }
  ) {
    this.isAddMode = !data.product;
  }

  ngOnInit(): void {
    this.initializeForm(this.data.product);
  }

  initializeForm(product: Product | null): void {
    const textOnlyRegex = /^[a-zA-Z\s,.'-]+$/;

    this.editForm = this.fb.group({
      name: [product?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]], 
      description: [product?.description || '', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      brand: [product?.brand ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]], 
      category: [product?.category ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(textOnlyRegex)]],
      stock: [product?.stock || 1, [Validators.required, Validators.min(1), Validators.max(10000)]], 
      subscriptions: this.fb.array(
        product?.subscriptions?.map((subscription: any) => this.createSubscriptionGroup(subscription)) || [this.createSubscriptionGroup()]
      ),
      discount: [product?.discount || 0, [Validators.required, Validators.min(0), Validators.max(100)]], 
      images: this.fb.array(product?.images || [])
    });

    this.existingImages = product?.images || [];
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
    
    // Construct the form data to send to the server based on the form values and selected files
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

    // Make an API call to save the product
    if (this.isAddMode) {
      // Add new product logic
    } else {
      // Update existing product logic
    }

    this.dialogRef.close(/* You can pass result object if needed */);
  }

  cancel(): void {
    this.dialogRef.close();
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
