// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  baseUrl = 'http://localhost:3000/api/v1'; 

  constructor(private http: HttpClient) { }

  addToCart(cartItem: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/carts`, cartItem);
  }

  getUserCartItems(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/carts/user/${userId}`);
  }
}

 
