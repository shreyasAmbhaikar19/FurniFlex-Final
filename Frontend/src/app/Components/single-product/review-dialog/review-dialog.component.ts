  import { Component, Inject,  EventEmitter, Output  } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { ProductService } from '../../../Services/products.service';
  import { Router } from '@angular/router';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

  @Component({
    selector: 'app-review-dialog',
    templateUrl: './review-dialog.component.html',
    styleUrl: './review-dialog.component.css'
  })

  export class ReviewDialogComponent {
    @Output() reviewAdded = new EventEmitter<boolean>();
    reviewForm: FormGroup;
    rating: number = 0;

    constructor(
      private fb: FormBuilder,
      private productService: ProductService,
      private router: Router,
      private dialogRef: MatDialogRef<ReviewDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any 
    ) {
      this.reviewForm = this.fb.group({
        comment: ['', Validators.required]
      });
    }

    setRating(star: number) {
      this.rating = star;
    }

    // submitReview(): void {
    //   if (this.reviewForm.valid) {
    //     const reviewData = {
    //       rating: this.rating,
    //       comment: this.reviewForm.get('comment')?.value,
    //       productId: this.data.product._id, 
    //     };
    //     this.productService.createProductReview(reviewData).subscribe({
    //       next: (response) => {
    //         this.reviewAdded.emit(true);
    //         this.dialogRef.close();
    //         this.router.navigate(['/product', this.data.product._id]); 
    //       },
    //       error: (error) => {
          
    //         console.error('Error submitting review', error);
    //       }
    //     });
    //   }
    // }

    submitReview(): void {
      if (this.reviewForm.valid) {
        const reviewData = {
          rating: this.rating,
          comment: this.reviewForm.get('comment')?.value,
          productId: this.data.product._id, 
        };
        this.productService.createProductReview(reviewData).subscribe({
          next: (response) => {
            // Assuming the review was successfully added; adjust based on your actual response structure
            if(response) {
              this.dialogRef.close(true); // Pass 'true' to indicate a review was added
            } else {
              // Handle failure case
              this.dialogRef.close(false);
            }
          },
          error: (error) => {
            console.error('Error submitting review', error);
            this.dialogRef.close(false); // Optionally close with 'false' or specific error info
          }
        });
      }
    }
    

    maybeLater(): void {
      this.dialogRef.close(); 
      this.router.navigate(['/product', this.data.product._id]); 
    }
  }
