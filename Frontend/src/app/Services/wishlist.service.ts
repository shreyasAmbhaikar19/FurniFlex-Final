import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  baseUrl: string = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  addToWishlist(productId: string) {
    return this.http.post(`${this.baseUrl}/wishlist`, { product: productId });
  }
}
