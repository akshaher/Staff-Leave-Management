import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllLeaves(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/leaves`);
  }

  getLeavesByStaff(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/leaves`);
  }

  getLeaveStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/leaves/stats`);
  }

  getLeaveById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/leaves/${id}`);
  }

  applyLeave(leaveData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/leaves`, leaveData);
  }

  updateLeaveStatus(id: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/leaves/${id}/status`, { status });
  }
}
