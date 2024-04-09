// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductService } from '../../Services/products.service';
// import { CartService } from '../../Services/cart.service';
// import { AuthService } from '../../Services/auth.service';

// @Component({
//   selector: 'app-single-product',
//   templateUrl: './single-product.component.html',
//   styleUrls: ['./single-product.component.css']
// })
// export class SingleProductComponent implements OnInit {
//   product: any;
//   quantity: number = 1;
//   baseUrl: string = 'http://localhost:3000/';
//   selectedSubscriptionId: string | null = null;
//   selectedSubscriptionMonthlyPrice: number | null = null;
//   selectedSubscription1: any;
//   constructor(
//     private productService: ProductService,
//     private cartService: CartService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authService: AuthService,
//   ) { }

//   ngOnInit(): void {
//     const productId = this.route.snapshot.paramMap.get('id');
//     if (productId) {
//       this.productService.getProductById(productId).subscribe({
//         next: (data) => {
//           if (data.success) {
//             this.product = data.product;
//             if (data.product.subscriptions && data.product.subscriptions.length > 0) {
//               this.selectedSubscriptionId = productId
            
//               this.selectedSubscriptionMonthlyPrice = JSON.parse(data.product.subscriptions[0]).monthlyPrice;
//               this.selectedSubscription1 = JSON.parse(data.product.subscriptions[0])
//                // Set default subscription price
//             }
//           } else {
//             // Handle "Product Not Found" or other errors
//           }
//         },
//         error: (error) => console.error(error)
//       });
//     }
//   }

//   ngOnChanges(): void {
//     if (this.product?.subscriptions && this.selectedSubscriptionId) {
//       // const selectedSubscription = this.product.subscriptions.find((subscription: any) => subscription._id === this.selectedSubscriptionId);
//       // this.selectedSubscriptionMonthlyPrice = selectedSubscription ? selectedSubscription.monthlyPrice : null;
//     }
//   }

//   getImageUrl(relativePath: string): string {
//     return this.baseUrl + relativePath.replace(/\\/g, '/');
//   }

//   increaseQuantity() {
//     this.quantity += 1;
//   }

//   decreaseQuantity() {
//     if (this.quantity > 1) {
//       this.quantity -= 1;
//     }
//   }

//   addToCart(): void {
//     // if (!this.selectedSubscriptionId) {
//     //   alert('Please select a subscription.');
//     //   return;
//     // }

//     // const selectedSubscription = this.product.subscriptions.find((subscription: any) => subscription._id === this.selectedSubscriptionId);

//     // if (!selectedSubscription) {
//     //   alert('Invalid subscription selected.');
//     //   return;
//     // }

//     const userId = this.authService.getUserId();

//     if (!userId) {
//       alert('Please log in to add items to the cart.');
//       return;
//     }

//     const cartItem = {
//       user: userId,
//       product: this.product._id,
//       quantity: this.quantity,
//       subscription: this.selectedSubscription1
    
//     };
//     console.log(cartItem)
//     this.cartService.addToCart(cartItem).subscribe({
//       next: (response) => {
//         console.log('Added to cart', response);
//         this.router.navigate(['/carts']); // Navigate to the cart component page
//       },
//       error: (error) => {
//         console.error('Error adding to cart', error);
//         alert('There was an error adding the item to the cart.');
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product: any;
  quantity: number = 1;
  baseUrl: string = 'http://localhost:3000/';
  selectedSubscriptionId: string | null = null;
  selectedSubscriptionMonthlyPrice: number | null = null;
  selectedSubscription1: any;
  mainImageUrl!: string;
  
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, 
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          if (data.success) {
            this.product = data.product;
            this.mainImageUrl = this.getImageUrl(this.product.images[0]);
            if (this.product.subscriptions && this.product.subscriptions.length > 0) {
              this.selectedSubscriptionId = this.product.subscriptions[0]._id;
              this.selectedSubscriptionMonthlyPrice = this.product.subscriptions[0].monthlyPrice;
              this.selectedSubscription1 = this.product.subscriptions[0];
            }else {
            console.warn("No subscriptions available for this product.");
          }
        } else {
          console.error("Product not found or an error occurred.");
        }
      },
        error: (error) => console.error(error)
      });
    } 
  }

  ngOnChanges(): void {
    if (this.product?.subscriptions && this.selectedSubscriptionId) {
      this.mainImageUrl = this.getImageUrl(this.product?.images[0]);
    }
  }

  updateSubscription(subscription: any): void {
    this.selectedSubscriptionId = subscription._id;
    this.selectedSubscriptionMonthlyPrice = subscription.monthlyPrice;
    this.selectedSubscription1 = subscription;
  }

  updateMainImage(imageUrl: string): void {
    this.mainImageUrl = this.getImageUrl(imageUrl);
  }

  getImageUrl(relativePath: string): string {
    return this.baseUrl + relativePath.replace(/\\/g, '/');
  }

  increaseQuantity() {
    this.quantity += 1;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addToCart(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.toast.warning({detail:"WARNING", summary:'Please log in to add items to the cart.', duration:3000, position:'topRight'});
      return;
    }
    const selectedSubscription = this.product.subscriptions.find((sub:any) => sub._id === this.selectedSubscriptionId);

    if (!selectedSubscription) {
      this.toast.warning({detail:"WARNING", summary:'Please select a subscription.', duration:3000, position:'topRight'});
      return;
    }

    const cartItem = {
      user: userId,
      product: this.product._id,
      quantity: this.quantity,
      subscription: {
        duration: selectedSubscription.duration,
        monthlyPrice: selectedSubscription.monthlyPrice
      },
      totalPrice: selectedSubscription.monthlyPrice * this.quantity * selectedSubscription.duration
    };

    console.log(cartItem)
    this.cartService.addToCart(cartItem).subscribe({
      next: (response) => {
        console.log('Added to cart', response);
        this.router.navigate(['/carts']); 
      },
      error: (error) => {
        console.error('Error adding to cart', error);
        alert('There was an error adding the item to the cart.');
      }
    });
  }
}
