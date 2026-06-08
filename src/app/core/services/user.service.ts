import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStaffList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/staff`);
  }

  getStaffCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/staff/count`);
  }

  getStaffById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/staff/${id}`);
  }

  addStaff(staff: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/staff`, staff);
  }

  deleteStaff(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/staff/${id}`);
  }
}
