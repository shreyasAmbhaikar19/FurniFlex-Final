// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../../Services/cart.service';
// import { AuthService } from '../../Services/auth.service';
// import { UserService } from '../../Services/user.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = [];
//   totalCartPrice:number = 0;
//   baseUrl: string = 'http://localhost:3000/';
//   addressForm: FormGroup;

//   constructor(
//     private cartService: CartService,
//     private authService: AuthService,
//     private userService: UserService,
//     private fb: FormBuilder
//   ) {
//     this.addressForm = this.fb.group({
//       address: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.loadCartItems();
//   }

//   loadCartItems(): void {
//     const userId = this.authService.getUserId(); 
//     this.cartService.getUserCartItems(userId).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.cartItems = response.cartItems;
//           this.calculateTotalCartPrice();
//         }
//       },
//       error: (error) => console.error('Error fetching cart items:', error)
//     });
//   }

//   removeCartItem(cartId: string): void {
//     this.cartService.removeCartItem(cartId).subscribe({
//       next: () => {
//         this.cartItems = this.cartItems.filter(item => item._id !== cartId);
//         this.calculateTotalCartPrice();
//         alert('Product removed from cart successfully');
//       },
//       error: (error) => console.error('Error removing cart item:', error)
//     });
//   }

//   calculateTotalCartPrice(): void {
   
//     this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
//   }

//   getImageUrl(relativePath: string): string {
//     return `${this.baseUrl}${relativePath.replace(/\\/g, '/')}`;
//   }

//   checkout(): void {
//     if (this.addressForm.valid) {
//       const address = this.addressForm.get('address')?.value;
//       this.userService.updateAddress(address).subscribe({
//         next: () => {
//           alert('Address updated and checkout successful');
//         },
//         error: (error) => console.error('Error during checkout:', error)
//       });
//     } else {
//       alert('Please fill in your address.');
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../../Services/cart.service';
// import { AuthService } from '../../Services/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = [];
//   totalCartPrice: number = 0;
//   baseUrl: string = 'http://localhost:3000/';
//   addressForm: FormGroup;

//   constructor(
//     private cartService: CartService,
//     private authService: AuthService,
//     private fb: FormBuilder
//   ) {
//     this.addressForm = this.fb.group({
//       address: ['', Validators.required] 
//     });
//   }

//   ngOnInit(): void {
//     this.loadCartItems();
//   }

//   loadCartItems(): void {
//     const userId = this.authService.getUserId(); 
//     this.cartService.getUserCartItems(userId).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.cartItems = response.cartItems;
//           this.calculateTotalCartPrice();
//         }
//       },
//       error: (error) => console.error('Error fetching cart items:', error)
//     });
//   }

//   removeCartItem(cartId: string): void {
//     this.cartService.removeCartItem(cartId).subscribe({
//       next: () => {
//         this.cartItems = this.cartItems.filter(item => item._id !== cartId);
//         this.calculateTotalCartPrice();
//         alert('Product removed from cart successfully');
//       },
//       error: (error) => console.error('Error removing cart item:', error)
//     });
//   }

//   calculateTotalCartPrice(): void {
//     this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
//   }

//   getImageUrl(relativePath: string): string {
//     return `${this.baseUrl}${relativePath.replace(/\\/g, '/')}`;
//   }

//   increaseQuantity(cartItem: any): void {
//     cartItem.quantity++;
//     this.updateCartItem(cartItem);
//   }
  
//   decreaseQuantity(cartItem: any): void {
//     if (cartItem.quantity > 1) {
//       cartItem.quantity--;
//       this.updateCartItem(cartItem);
//     }
//   }
  
//   updateCartItem(cartItem: any): void {
//     const updateData = {
//       quantity: cartItem.quantity
//     };
//     this.cartService.updateCartItem(cartItem._id, updateData).subscribe({
//       next: (response) => {
//         this.calculateTotalCartPrice();
//         console.log('Cart item updated', response);
//       },
//       error: (error) => console.error('Error updating cart item:', error)
//     });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../../Services/cart.service';
// import { AuthService } from '../../Services/auth.service';
// import { UserService } from '../../Services/user.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = [];
//   totalCartPrice: number = 0;
//   taxRate: number = 0.18; 
//   taxAmount: number = 0;
//   totalWithTax: number = 0;
//   baseUrl: string = 'http://localhost:3000/';
//   addressForm: FormGroup;
//   userAddress: string | null = null;


//   constructor(
//     private cartService: CartService,
//     private authService: AuthService,
//     private userService: UserService,
//     private fb: FormBuilder,
//     private router: Router
//   ) {
//     this.addressForm = this.fb.group({
//       address: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.loadCartItems();
//     this.loadUserAddress();
//   }

//   loadUserAddress(): void {
//     const userId = this.authService.getUserId();
//     if (userId) {
//       this.userService.getUserDetails().subscribe({
//         next: (response) => {
//           if (response.success && response.user.address) {
//             this.userAddress = response.user.address;
//             this.addressForm.controls['address'].setValue(this.userAddress);
//           }
//         },
//         error: (error) => console.error('Error fetching user details:', error)
//       });
//     }
//   }

//   onUpdateAddress(): void {
//     this.router.navigate(['/profile']);
//   }


//   loadCartItems(): void {
//     const userId = this.authService.getUserId();
//     this.cartService.getUserCartItems(userId).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.cartItems = response.cartItems;
//           this.calculateTotalCartPrice();
//         }
//       },
//       error: (error) => console.error('Error fetching cart items:', error)
//     });
//   }

//   increaseQuantity(cartItem: any): void {
//     const updatedQuantity = cartItem.quantity + 1;
//     this.updateCartItemQuantity(cartItem, updatedQuantity);
//   }

//   decreaseQuantity(cartItem: any): void {
//     if (cartItem.quantity > 1) {
//       const updatedQuantity = cartItem.quantity - 1;
//       this.updateCartItemQuantity(cartItem, updatedQuantity);
//     }
//   }

//   updateCartItemQuantity(cartItem: any, newQuantity: number): void {
//     this.cartService.updateCartItem(cartItem._id, { quantity: newQuantity }).subscribe({
//       next: (response) => {
//         if (response.success) {
//           const index = this.cartItems.findIndex(item => item._id === cartItem._id);
//           if (index !== -1) {
//             this.cartItems[index] = {
//               ...this.cartItems[index],
//               quantity: newQuantity,
//               totalPrice: response.updatedCartItem.totalPrice
//             };
//             this.calculateTotalCartPrice();
//           }
//         }
//       },
//       error: (error) => {
//         console.error('Error updating cart item quantity:', error);
//         alert('Error updating cart item. Please try again.');
//       }
//     });
//   }

//   removeCartItem(cartId: string): void {
//     this.cartService.removeCartItem(cartId).subscribe({
//       next: () => {
//         this.cartItems = this.cartItems.filter(item => item._id !== cartId);
//         this.calculateTotalCartPrice();
//         alert('Product removed from cart successfully');
//       },
//       error: (error) => console.error('Error removing cart item:', error)
//     });
//   }

//   calculateTotalCartPrice(): void {
//     this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
//     this.taxAmount = this.totalCartPrice * this.taxRate;
//     this.totalWithTax = this.totalCartPrice + this.taxAmount;
//   }

//   getImageUrl(relativePath: string): string {
//     return `${this.baseUrl}${relativePath.replace(/\\/g, '/')}`;
//   }
// }


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { UserService } from '../../Services/user.service';
import { OrderService } from '../../Services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../admin-dashboard/tabs/delete-dialog/delete-dialog.component';
import { NgToastService } from 'ng-angular-popup';



declare let Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalCartPrice: number = 0;
  taxRate: number = 0.18; 
  taxAmount: number = 0;
  totalWithTax: number = 0;
  baseUrl: string = 'http://localhost:3000/';
  addressForm: FormGroup;
  userAddress: string | null = null;


  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog, 
    private toast: NgToastService
  ) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadUserAddress();
  }

  loadUserAddress(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserDetails().subscribe({
        next: (response) => {
          if (response.success && response.user.address) {
            this.userAddress = response.user.address;
            this.addressForm.controls['address'].setValue(this.userAddress);
          }
        },
        error: (error) => console.error('Error fetching user details:', error)
      });
    }
  }

  onUpdateAddress(): void {
    this.router.navigate(['/profile']);
  }


  loadCartItems(): void {
    const userId = this.authService.getUserId();
    this.cartService.getUserCartItems(userId).subscribe({
      next: (response) => {
        console.log(response.cartItems);
        if (response.success) {
          this.cartItems = response.cartItems;
          this.calculateTotalCartPrice();
        }
      },
      error: (error) => console.error('Error fetching cart items:', error)
    });
  }

  increaseQuantity(cartItem: any): void {
    const updatedQuantity = cartItem.quantity + 1;
    this.updateCartItemQuantity(cartItem, updatedQuantity);
  }

  decreaseQuantity(cartItem: any): void {
    if (cartItem.quantity > 1) {
      const updatedQuantity = cartItem.quantity - 1;
      this.updateCartItemQuantity(cartItem, updatedQuantity);
    }
  }

  updateCartItemQuantity(cartItem: any, newQuantity: number): void {
    this.cartService.updateCartItem(cartItem._id, { quantity: newQuantity }).subscribe({
      next: (response) => {
        if (response.success) {
          const index = this.cartItems.findIndex(item => item._id === cartItem._id);
          if (index !== -1) {
            this.cartItems[index] = {
              ...this.cartItems[index],
              quantity: newQuantity,
              totalPrice: response.updatedCartItem.totalPrice
            };
            this.calculateTotalCartPrice();
          }   
        }
      },
      error: (error) => {
        console.error('Error updating cart item quantity:', error);
        this.toast.error({detail:"ERROR", summary:'Error updating cart item. Please try again.', duration:3000, position:'topRight'});
      }
    });
  }

  // removeCartItem(cartId: string): void {
  //   this.cartService.removeCartItem(cartId).subscribe({
  //     next: () => {
  //       this.cartItems = this.cartItems.filter(item => item._id !== cartId);
  //       this.calculateTotalCartPrice();
  //       alert('Product removed from cart successfully');
  //     },
  //     error: (error) => console.error('Error removing cart item:', error)
  //   });
  // }

  removeCartItem(cartId: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to remove this item from the cart?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.removeCartItem(cartId).subscribe({
          next: () => {
            this.cartItems = this.cartItems.filter(item => item._id !== cartId);
            this.calculateTotalCartPrice();
            this.toast.success({detail:"SUCCESS", summary:'Product removed from cart successfully!', duration:3000, position:'topRight'});
          },
          error: (error) => console.error('Error removing cart item:', error)
        });
      }
    });
  }

  calculateTotalCartPrice(): void {
    this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    this.taxAmount = this.totalCartPrice * this.taxRate;
    this.totalWithTax = this.totalCartPrice + this.taxAmount;
  }

  getImageUrl(relativePath: string): string {
    return `${this.baseUrl}${relativePath.replace(/\\/g, '/')}`;
  }

  initiatePayment(): void {
    this.orderService.createPaymentOrder(this.totalWithTax).subscribe({
      next: (order) => {
        let options = {
          "key": environment.RAZORPAY_KEY,
          "amount": order.amount,
          "currency": "INR",
          "name": "FurniFlex",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": order.id, 
          "handler": (response:any) => {
              console.log(response);
              this.handlePaymentSuccess(response);
          },
          "prefill": {
              "name": "Gaurav Kumar",
              "email": "gaurav.kumar@example.com",
              "contact": "9999999999"
          },
          "theme": {
              "color": "#3399cc"
          },
        };
        let rzp1 = new Razorpay(options);
        rzp1.open();
      },
      error: (error) => console.error('Error initiating payment:', error)
    });
  }


  handlePaymentSuccess(response: any): void {
    if (!this.userAddress) {
      this.toast.error({detail:"ERROR", summary:'Shipping address is required', duration:3000, position:'topRight'});
      return;
    }

    const orderDetails = {
      user: this.authService.getUserId(),
      shippingInfo: this.userAddress,
      orderItems: this.cartItems.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.subscription.monthlyPrice,
        quantity: item.quantity,
        image: item.product.images[0], 
      })),
      paymentInfo: {
        id: response.razorpay_payment_id,
        status: 'Success'
      },
      totalPrice: this.totalWithTax
    };
  
    this.orderService.createOrder(orderDetails).subscribe({
      next: (data) => {
        console.log('Order created successfully', data);
        this.toast.success({detail:"SUCCESS", summary:'Order placed successfully!', duration:3000, position:'topRight'});
        this.clearCartItems();
        this.router.navigate(['/settings/order-history']);
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.toast.error({detail:"ERROR", summary:'There was an issue while placing the order. Please try again.', duration:3000, position:'topRight'});
      }
    });
  }

  clearCartItems(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cartItems = [];
        this.calculateTotalCartPrice();
        console.log('Cart cleared successfully');
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error clearing cart:', error)
    });
  }
}
