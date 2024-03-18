import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';

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
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          if (data.success) {
            this.product = data.product;
            if (data.product.subscriptions && data.product.subscriptions.length > 0) {
              this.selectedSubscriptionId = productId
            
              this.selectedSubscriptionMonthlyPrice = JSON.parse(data.product.subscriptions[0]).monthlyPrice;
              this.selectedSubscription1 = JSON.parse(data.product.subscriptions[0])
               // Set default subscription price
            }
          } else {
            // Handle "Product Not Found" or other errors
          }
        },
        error: (error) => console.error(error)
      });
    }
  }

  ngOnChanges(): void {
    if (this.product?.subscriptions && this.selectedSubscriptionId) {
      // const selectedSubscription = this.product.subscriptions.find((subscription: any) => subscription._id === this.selectedSubscriptionId);
      // this.selectedSubscriptionMonthlyPrice = selectedSubscription ? selectedSubscription.monthlyPrice : null;
    }
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
    // if (!this.selectedSubscriptionId) {
    //   alert('Please select a subscription.');
    //   return;
    // }

    // const selectedSubscription = this.product.subscriptions.find((subscription: any) => subscription._id === this.selectedSubscriptionId);

    // if (!selectedSubscription) {
    //   alert('Invalid subscription selected.');
    //   return;
    // }

    const userId = this.authService.getUserId();

    if (!userId) {
      alert('Please log in to add items to the cart.');
      return;
    }

    const cartItem = {
      user: userId,
      product: this.product._id,
      quantity: this.quantity,
      subscription: this.selectedSubscription1
    
    };
    console.log(cartItem)
    this.cartService.addToCart(cartItem).subscribe({
      next: (response) => {
        console.log('Added to cart', response);
        this.router.navigate(['/carts']); // Navigate to the cart component page
      },
      error: (error) => {
        console.error('Error adding to cart', error);
        alert('There was an error adding the item to the cart.');
      }
    });
  }
}
