import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private leaves = [
    { id: '1', staffName: 'John Doe', fromDate: '2023-10-01', toDate: '2023-10-05', reason: 'Vacation', status: 'Approved' },
    { id: '2', staffName: 'Jane Smith', fromDate: '2023-11-01', toDate: '2023-11-02', reason: 'Sick Leave', status: 'Pending' }
  ];

  getAllLeaves() {
    return this.leaves;
  }

  getLeavesByStaff(username: string) {
    return this.leaves; // Dummy logic: return all for now
  }

  getLeaveStats() {
    return {
      total: this.leaves.length,
      approved: this.leaves.filter(l => l.status === 'Approved').length,
      rejected: this.leaves.filter(l => l.status === 'Rejected').length
    };
  }
}