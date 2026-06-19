import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMonthlyLeaves() {
    return this.http.get<any[]>(
      `${this.baseUrl}/dashboard/monthly-leaves`
    );
  }

  getStaffByDepartment() {
    return this.http.get<any[]>(
      `${this.baseUrl}/dashboard/staff-by-department`
    );
  }

  getLeaveStatus() {
    return this.http.get<any[]>(
      `${this.baseUrl}/dashboard/leave-status`
    );
  }
}