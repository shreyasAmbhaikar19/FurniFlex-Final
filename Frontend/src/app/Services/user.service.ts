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

  updateUserRole(userId: string, role: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/user/${userId}`, { role }, { withCredentials: true });
  }


  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/user/${userId}`, { withCredentials: true });
  }
}

