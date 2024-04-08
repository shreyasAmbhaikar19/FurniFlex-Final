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

  getMyOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/me`, { withCredentials: true });
  }

  getAllOrders(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/orders?page=${page}&limit=${limit}`, { withCredentials: true });
  }

  searchAndPaginateOrders(keyword: string, page: number, limit: number): Observable<any> {
    let query = `admin/orders?page=${page}&limit=${limit}`;
    if (keyword) {
      query += `&keyword=${keyword}`;
    }
    return this.http.get(`${this.baseUrl}/${query}`, { withCredentials: true }); 
  }

  updateOrder(orderId: string, orderData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/order/${orderId}`, orderData, { withCredentials: true });
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/order/${orderId}`, { withCredentials: true });
  }
}
