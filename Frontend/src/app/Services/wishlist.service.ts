import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://localhost:3000/api/v1/'; 

  constructor(private http: HttpClient) { }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}wishlist`, { product: productId }, { withCredentials: true });
  }

  getWishlist(): Observable<any> {
    return this.http.get(`${this.baseUrl}wishlist`, { withCredentials: true });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}wishlist/remove`, { product: productId }, { withCredentials: true });
  }
}
