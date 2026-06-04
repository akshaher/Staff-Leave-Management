const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app');

const files = [
  {
    path: 'core/services/user.service.ts',
    content: `import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private staffList = [
    { id: '1', fullName: 'John Doe', username: 'johnd', email: 'john@example.com', mobile: '1234567890', department: 'CS' },
    { id: '2', fullName: 'Jane Smith', username: 'janes', email: 'jane@example.com', mobile: '0987654321', department: 'CS' }
  ];

  getStaffList() {
    return this.staffList;
  }

  getStaffCount() {
    return this.staffList.length;
  }
}`
  },
  {
    path: 'core/services/leave.service.ts',
    content: `import { Injectable } from '@angular/core';

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
}`
  },
  {
    path: 'modules/dashboard/dashboard.component.ts',
    content: `import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { LeaveService } from '../../core/services/leave.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: string | null = '';
  staffCount = 0;
  leaveStats = { total: 0, approved: 0, rejected: 0 };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    // Dummy role for testing: change to 'HOD' or 'STAFF' to test different views
    this.role = this.authService.getRole() || 'HOD'; 
    
    if (this.role === 'HOD') {
      this.staffCount = this.userService.getStaffCount();
    } else {
      this.leaveStats = this.leaveService.getLeaveStats();
    }
  }
}`
  },
  {
    path: 'modules/dashboard/dashboard.component.html',
    content: `<div class="container mt-4">
  <h2>Dashboard</h2>
  <div *ngIf="role === 'HOD'" class="row mt-4">
    <div class="col-md-4">
      <div class="card text-white bg-primary mb-3">
        <div class="card-body">
          <h5 class="card-title">Total Staff Members</h5>
          <p class="card-text display-4">{{ staffCount }}</p>
        </div>
      </div>
    </div>
  </div>

  <div *ngIf="role === 'STAFF'" class="row mt-4">
    <div class="col-md-4">
      <div class="card text-white bg-info mb-3">
        <div class="card-body">
          <h5 class="card-title">Total Leaves Applied</h5>
          <p class="card-text display-4">{{ leaveStats.total }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card text-white bg-success mb-3">
        <div class="card-body">
          <h5 class="card-title">Approved Leaves</h5>
          <p class="card-text display-4">{{ leaveStats.approved }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card text-white bg-danger mb-3">
        <div class="card-body">
          <h5 class="card-title">Rejected Leaves</h5>
          <p class="card-text display-4">{{ leaveStats.rejected }}</p>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    path: 'modules/staff/staff-list/staff-list.component.ts',
    content: `import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  staffList: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.staffList = this.userService.getStaffList();
  }

  deleteStaff(id: string) {
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.staffList = this.staffList.filter(s => s.id !== id);
    }
  }
}`
  },
  {
    path: 'modules/staff/staff-list/staff-list.component.html',
    content: `<div class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Staff Management</h2>
    <button class="btn btn-primary" routerLink="/staff/add">Add New Staff</button>
  </div>
  
  <table class="table table-bordered table-striped">
    <thead class="table-dark">
      <tr>
        <th>Full Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let staff of staffList">
        <td>{{ staff.fullName }}</td>
        <td>{{ staff.username }}</td>
        <td>{{ staff.email }}</td>
        <td>{{ staff.mobile }}</td>
        <td>
          <button class="btn btn-sm btn-info me-2">View</button>
          <button class="btn btn-sm btn-danger" (click)="deleteStaff(staff.id)">Delete</button>
        </td>
      </tr>
      <tr *ngIf="staffList.length === 0">
        <td colspan="5" class="text-center">No staff members found.</td>
      </tr>
    </tbody>
  </table>
</div>`
  },
  {
    path: 'modules/leave/leave-list/leave-list.component.ts',
    content: `import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  leaveList: any[] = [];
  role: string | null = '';

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole() || 'HOD';
    
    if (this.role === 'HOD') {
      this.leaveList = this.leaveService.getAllLeaves();
    } else {
      this.leaveList = this.leaveService.getLeavesByStaff('currentUser');
    }
  }

  updateStatus(leave: any, status: string) {
    leave.status = status;
  }
}`
  },
  {
    path: 'modules/leave/leave-list/leave-list.component.html',
    content: `<div class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Leave Management</h2>
    <button *ngIf="role === 'STAFF'" class="btn btn-primary" routerLink="/leave/apply">Apply for New Leave</button>
  </div>
  
  <table class="table table-bordered table-striped">
    <thead class="table-dark">
      <tr>
        <th>Sr No.</th>
        <th *ngIf="role === 'HOD'">Staff Name</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Reason</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let leave of leaveList; let i = index">
        <td>{{ i + 1 }}</td>
        <td *ngIf="role === 'HOD'">{{ leave.staffName }}</td>
        <td>{{ leave.fromDate }}</td>
        <td>{{ leave.toDate }}</td>
        <td>{{ leave.reason }}</td>
        <td>
          <span class="badge" 
                [ngClass]="{'bg-success': leave.status === 'Approved', 'bg-warning': leave.status === 'Pending', 'bg-danger': leave.status === 'Rejected'}">
            {{ leave.status }}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-info me-2">View</button>
          <ng-container *ngIf="role === 'HOD' && leave.status === 'Pending'">
            <button class="btn btn-sm btn-success me-2" (click)="updateStatus(leave, 'Approved')">Approve</button>
            <button class="btn btn-sm btn-danger" (click)="updateStatus(leave, 'Rejected')">Reject</button>
          </ng-container>
        </td>
      </tr>
      <tr *ngIf="leaveList.length === 0">
        <td colspan="7" class="text-center">No leave records found.</td>
      </tr>
    </tbody>
  </table>
</div>`
  }
];

files.forEach(file => {
  const fullPath = path.join(baseDir, file.path);
  fs.writeFileSync(fullPath, file.content, 'utf8');
  console.log('Updated ' + file.path);
});

console.log('All components updated successfully!');
