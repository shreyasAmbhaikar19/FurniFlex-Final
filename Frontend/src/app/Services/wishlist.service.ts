import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  addToWishlist(productId: string) {
    const url = `http://localhost:3000/api/v1/wishlist`;
    return this.http.post(url, { product: productId });
  }
}
