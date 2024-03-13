import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/users`, { withCredentials: true });
  }

  updateAddress(address: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/me/update`, { address });
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/user/new`, userData, { withCredentials: true });
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/user/${userId}`, userData, { withCredentials: true });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/user/${userId}`, { withCredentials: true });
  }
}

