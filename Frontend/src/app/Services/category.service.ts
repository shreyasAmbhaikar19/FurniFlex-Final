// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  addNewCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/category/new`, categoryData, { withCredentials: true });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`, { withCredentials: true });
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/category/${categoryId}`, { withCredentials: true });
  }

  getCategoryProductCounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/product-counts`, { withCredentials: true });
  }
}
