// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CategoryService } from '../../../../Services/category.service';

// @Component({
//   selector: 'app-categories',
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.css']
// })
// export class CategoriesComponent implements OnInit {
//   isLoading = true;
//   categories: any = [];
//   categoryForm!: FormGroup;
//   isEditingCategory = false;
//   currentCategory: any | null = null;

//   constructor(
//     private categoryService: CategoryService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.fetchCategories();
//     this.initForm();
//   }

//   initForm(): void {
//     this.categoryForm = this.fb.group({
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       image: ['', Validators.required] // Assuming you want an image URL
//     });
//   }

//   fetchCategories(): void {
//     this.isLoading = true;
//     this.categoryService.getAllCategories().subscribe({
//       next: (data) => {
//         this.categories = data.categories;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('There was an error!', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   onEdit(category: any): void {
//     this.currentCategory = category;
//     this.isEditingCategory = true;
//     this.categoryForm.patchValue(category);
//   }

//   onSubmit(): void {
//     if (this.categoryForm.valid) {
//       const formData = this.categoryForm.value;
      
//       if (this.isEditingCategory && this.currentCategory) {
//         // Assuming you have an updateCategory method for editing (not shown in CategoryService)
//         // this.categoryService.updateCategory(this.currentCategory._id, formData).subscribe({
//         //   next: () => this.afterSubmit(),
//         //   error: error => console.error('Error updating category:', error)
//         // });
//       } else {
//         this.categoryService.addNewCategory(formData).subscribe({
//           next: () => this.afterSubmit(),
//           error: error => console.error('Error adding new category:', error)
//         });
//       }
//     }
//   }

//   afterSubmit(): void {
//     this.fetchCategories();
//     this.isEditingCategory = false;
//     this.currentCategory = null;
//     this.categoryForm.reset();
//   }

//   onDelete(categoryId: string): void {
//     if (confirm('Are you sure you want to delete this category?')) {
//       this.categoryService.deleteCategory(categoryId).subscribe({
//         next: () => {
//           this.fetchCategories();
//         },
//         error: (error) => {
//           console.error('Error deleting the category:', error);
//         }
//       });
//     }
//   }

//   onCancel(): void {
//     this.isEditingCategory = false;
//     this.currentCategory = null;
//     this.categoryForm.reset();
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CategoryService } from '../../../../Services/category.service';

// @Component({
//   selector: 'app-categories',
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.css']
// })

// export class CategoriesComponent implements OnInit {
//   isLoading: boolean = true;
//   categories: any[] = [];
//   categoryForm!: FormGroup;

//   isAddMode: boolean = false;
//   baseUrl: string = 'http://localhost:3000/';

//   constructor(
//     private categoryService: CategoryService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.fetchCategories();
//     this.initForm();
//   }
  
//   initForm(): void {
//     this.categoryForm = this.fb.group({
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       image: ['', Validators.required] 
//     });
//   }
  
//   fetchCategories(): void {
//     this.isLoading = true;
//     this.categoryService.getAllCategories().subscribe({
//       next: (data) => {
//         this.categories = data.categories;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('There was an error!', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.categoryForm.valid) {
//       const formData = new FormData();
//       formData.append('name', this.categoryForm.get('name')!.value);
//       formData.append('image', this.categoryForm.get('image')!.value);

//       this.categoryService.addNewCategory(formData).subscribe({
//         next: () => this.afterSubmit(),
//         error: error => console.error('Error adding new category:', error)
//       });
//     }
//   }

//   afterSubmit(): void {
//     this.fetchCategories();
//     this.categoryForm.reset();
//   }

//   handleFileInput(event: any): void {
//     const file: File = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e: any) => {
//       this.categoryForm.patchValue({
//         image: file
//       });
//     };

//     reader.readAsDataURL(file);
//   }

//   prepareAddCategory(): void {
//     this.isAddMode = true;
//     this.initForm();
//   }

//   cancelAdding(): void {
//     this.isAddMode = false;
//     this.categoryForm.reset();
//   }

//   onDelete(categoryId: string): void {
//     if (confirm('Are you sure you want to delete this category?')) {
//       this.categoryService.deleteCategory(categoryId).subscribe({
//         next: () => {
//           this.fetchCategories();
//         },
//         error: (error) => {
//           console.error('Error deleting the category:', error);
//         }
//       });
//     }
//   }

//   getImageUrl(images: string[]): string {
//     if (images && images.length > 0) {
//       const correctedPath = images[0].replace(/\\/g, '/');
//       return `${this.baseUrl}${correctedPath}`;
//     }
//     return 'https://via.placeholder.com/150';
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../Services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  isLoading: boolean = true;
  categories: any[] = [];
  categoryForm!: FormGroup;

  isAddMode: boolean = false;
  baseUrl: string = 'http://localhost:3000/';

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.initForm();
  }
  
  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      image: [null, Validators.required] 
    });
  }

  openDeleteDialog(categoryName: string, categoryId: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Deleting Category',
        message: `Are you sure you want to delete the category "${categoryName}"?`,
        confirmText: 'Yes, delete',
        cancelText: 'No, cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory(categoryId);
      }
    });
  }
  
  fetchCategories(): void {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')!.value);
      formData.append('image', this.categoryForm.get('image')!.value);

      this.categoryService.addNewCategory(formData).subscribe({
        next: () => {
          this.afterSubmit();
          this.isAddMode = false; 
        },
        error: error => console.error('Error adding new category:', error)
      });
    }
  }

  afterSubmit(): void {
    this.fetchCategories();
    this.categoryForm.reset();
  }

  handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.categoryForm.patchValue({
        image: file
      });
      this.categoryForm.get('image')!.updateValueAndValidity();
    }
  }

  prepareAddCategory(): void {
    this.isAddMode = true;
    this.initForm();
  }

  cancelAdding(): void {
    this.isAddMode = false;
    this.categoryForm.reset();
  }

  private deleteCategory(categoryId: string): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.fetchCategories();
      },
      error: (error) => {
        console.error('Error deleting the category:', error);
      }
    });
  }

  getImageUrl(image: string): string {
    if (image) {
      const correctedPath = image.replace(/\\/g, '/');
      return `${this.baseUrl}${correctedPath}`;
    }
    return 'https://via.placeholder.com/150';
  }
}

