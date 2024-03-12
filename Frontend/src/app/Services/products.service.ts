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

  searchProducts(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}products/?keyword=${keyword}`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${id}`);
  }

  updateProduct(productId: string, productData: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
