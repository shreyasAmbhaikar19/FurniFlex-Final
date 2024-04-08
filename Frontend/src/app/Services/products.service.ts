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

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}product/${id}`);
  }

  searchProducts(keyword: string, page: number, limit: number): Observable<any> {
    let query = `products?page=${page}&limit=${limit}`;
    if (keyword) {
      query += `&keyword=${keyword}`;
    }
    return this.http.get(`${this.baseUrl}${query}`);
  }

  getProductsByCategory(category: string, page: number, limit: number): Observable<any> {
    let query = `products?category=${category}&page=${page}&limit=${limit}`;
    return this.http.get(`${this.baseUrl}${query}`);
  }

  getPaginatedProducts(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}products?page=${page}&limit=${limit}`);
  }

  updateProductAdmin(productId: string, productData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}admin/product/${productId}`, productData, {
      withCredentials: true
    });
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}admin/product/${productId}`, { withCredentials: true });
  }
}
