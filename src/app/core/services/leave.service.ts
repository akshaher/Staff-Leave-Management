import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private baseUrl = environment.apiUrl;
  private leavesSubject = new BehaviorSubject<any[]>([]);
  private loaded = false;

  leaves$ = this.leavesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllLeaves(): Observable<any[]> {
    return this.loadLeaves();
  }

  getLeavesByStaff(username: string): Observable<any[]> {
    return this.loadLeaves();
  }

  getLeaveStats(): Observable<any> {
    return this.loadLeaves().pipe(
      map((leaves) => ({
        total: leaves.length,
        approved: leaves.filter((leave) => leave.status === 'Approved').length,
        rejected: leaves.filter((leave) => leave.status === 'Rejected').length
      }))
    );
  }

  getLeaveById(id: string): Observable<any> {
    return this.loadLeaves().pipe(
      map((leaves) => leaves.find((leave) => String(leave.id) === String(id)))
    );
  }

  applyLeave(leaveData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/leaves`, leaveData).pipe(
      tap((newLeave) => {
        this.loaded = true;
        this.leavesSubject.next([...this.leavesSubject.value, newLeave]);
      })
    );
  }

  updateLeaveStatus(id: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/leaves/${id}/status`, { status }).pipe(
      tap((updatedLeave) => {
        const leaves = this.leavesSubject.value.map((leave) =>
          String(leave.id) === String(updatedLeave.id) ? updatedLeave : leave
        );

        this.leavesSubject.next(leaves);
      })
    );
  }

  refreshLeaves(): Observable<any[]> {
    this.loaded = false;
    return this.loadLeaves();
  }

  private loadLeaves(): Observable<any[]> {
    if (this.loaded) {
      return of(this.leavesSubject.value).pipe(take(1));
    }

    return this.http.get<any[]>(`${this.baseUrl}/leaves`).pipe(
      tap((leaves) => {
        this.loaded = true;
        this.leavesSubject.next(leaves);
      })
    );
  }
}
