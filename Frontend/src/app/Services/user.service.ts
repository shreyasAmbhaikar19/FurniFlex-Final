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

    updateUserRole(userId: string, role: string): Observable<any> {
      return this.http.put(`${this.baseUrl}/admin/user/${userId}`, { role }, { withCredentials: true });
    }

    deleteUser(userId: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/admin/user/${userId}`, { withCredentials: true });
    }
    
    getUserDetails(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/me`, { withCredentials: true });
    }

    updateUserDetails(updatedUserDetails: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/me/update`, updatedUserDetails, { withCredentials: true });
    }

    getPaginatedUsers(page: number, limit: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/admin/users?page=${page}&limit=${limit}`, { withCredentials: true });
    }
    
    searchUsers(keyword: string, page: number, limit: number): Observable<any> {
      let query = `?page=${page}&limit=${limit}`;
      if (keyword) {
        query += `&keyword=${keyword}`;
      }
      return this.http.get(`${this.baseUrl}/admin/users${query}`, { withCredentials: true });
    }

    getTotalUsersCount(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/admin/users/count`, { withCredentials: true });
    }

    // updatePassword(passwordData: any): Observable<any> {
    //   return this.http.put(`${this.baseUrl}/password/update`, passwordData, { withCredentials: true });
    // }
  }