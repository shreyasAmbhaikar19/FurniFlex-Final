// src/app/Services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const url = `${this.baseUrl}products/all`; 
    return this.http.get<{success: boolean, products: Product[]}>(url).pipe(
      map(response => response.products)
    );
  }

  createProduct(productData: any): Observable<Product> {
    console.log(productData);
    return this.http.post<Product>(`${this.baseUrl}admin/product/new`, productData, { withCredentials: true });
  }

  searchProducts(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}products/?keyword=${keyword}`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}product/${id}`);
  }

  // updateProductAdmin(productId: string, productData: FormData): Observable<Product> {
  //   console.log(productId, productData);
  //   return this.http.put<Product>(`${this.baseUrl}admin/product/${productId}`, productData, { withCredentials: true });
  // }

  updateProductAdmin(productId: string, productData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}admin/product/${productId}`, productData, {
      withCredentials: true
    });
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}admin/product/${productId}`, { withCredentials: true });
  }
}
