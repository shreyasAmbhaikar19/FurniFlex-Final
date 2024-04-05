import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  baseUrl = 'http://localhost:3000/api/v1'; 

  constructor(private http: HttpClient) { }

  createPaymentOrder(totalPrice: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment/order`, { totalPrice }, { withCredentials: true });
  }

  createOrder(orderDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/new`, orderDetails, { withCredentials: true });
  }
}

 
