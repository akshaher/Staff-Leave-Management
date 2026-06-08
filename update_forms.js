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

  addStaff(staff: any) {
    staff.id = (this.staffList.length + 1).toString();
    this.staffList.push(staff);
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
    return this.leaves; 
  }

  getLeaveById(id: string) {
    return this.leaves.find(l => l.id === id);
  }

  addLeave(leave: any) {
    leave.id = (this.leaves.length + 1).toString();
    leave.status = 'Pending';
    leave.staffName = 'Current User'; // Mocked
    this.leaves.push(leave);
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
    path: 'modules/staff/staff.module.ts',
    content: `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';

@NgModule({
  declarations: [
    StaffListComponent,
    AddStaffComponent,
    ViewStaffComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }`
  },
  {
    path: 'modules/leave/leave.module.ts',
    content: `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';

@NgModule({
  declarations: [
    LeaveListComponent,
    ApplyLeaveComponent,
    LeaveDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LeaveRoutingModule
  ]
})
export class LeaveModule { }`
  },
  {
    path: 'modules/staff/add-staff/add-staff.component.ts',
    content: `import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html'
})
export class AddStaffComponent {
  staffData = {
    fullName: '',
    username: '',
    email: '',
    mobile: '',
    department: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.addStaff({ ...this.staffData });
    alert('Staff added successfully!');
    this.router.navigate(['/staff']);
  }
}`
  },
  {
    path: 'modules/staff/add-staff/add-staff.component.html',
    content: `<div class="container mt-4">
  <div class="card shadow-sm" style="max-width: 600px; margin: auto;">
    <div class="card-header bg-primary text-white">
      <h4 class="mb-0">Add New Staff</h4>
    </div>
    <div class="card-body">
      <form (ngSubmit)="onSubmit()" #staffForm="ngForm">
        <div class="mb-3">
          <label>Full Name</label>
          <input type="text" class="form-control" name="fullName" [(ngModel)]="staffData.fullName" required>
        </div>
        <div class="mb-3">
          <label>Username</label>
          <input type="text" class="form-control" name="username" [(ngModel)]="staffData.username" required>
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input type="email" class="form-control" name="email" [(ngModel)]="staffData.email" required>
        </div>
        <div class="mb-3">
          <label>Contact Number</label>
          <input type="text" class="form-control" name="mobile" [(ngModel)]="staffData.mobile" required>
        </div>
        <div class="mb-3">
          <label>Department</label>
          <select class="form-control" name="department" [(ngModel)]="staffData.department" required>
            <option value="">Select Department</option>
            <option value="CS">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="MECH">Mechanical</option>
          </select>
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input type="password" class="form-control" name="password" [(ngModel)]="staffData.password" required>
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" routerLink="/staff">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="!staffForm.valid">Add Staff</button>
        </div>
      </form>
    </div>
  </div>
</div>`
  },
  {
    path: 'modules/leave/apply-leave/apply-leave.component.ts',
    content: `import { Component } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html'
})
export class ApplyLeaveComponent {
  leaveData = {
    fromDate: '',
    toDate: '',
    reason: ''
  };

  constructor(private leaveService: LeaveService, private router: Router) {}

  onSubmit() {
    this.leaveService.addLeave({ ...this.leaveData });
    alert('Leave application submitted!');
    this.router.navigate(['/leave']);
  }
}`
  },
  {
    path: 'modules/leave/apply-leave/apply-leave.component.html',
    content: `<div class="container mt-4">
  <div class="card shadow-sm" style="max-width: 600px; margin: auto;">
    <div class="card-header bg-primary text-white">
      <h4 class="mb-0">Apply For Leave</h4>
    </div>
    <div class="card-body">
      <form (ngSubmit)="onSubmit()" #leaveForm="ngForm">
        <div class="mb-3">
          <label>From Date</label>
          <input type="date" class="form-control" name="fromDate" [(ngModel)]="leaveData.fromDate" required>
        </div>
        <div class="mb-3">
          <label>To Date</label>
          <input type="date" class="form-control" name="toDate" [(ngModel)]="leaveData.toDate" required>
        </div>
        <div class="mb-3">
          <label>Reason</label>
          <textarea class="form-control" name="reason" [(ngModel)]="leaveData.reason" rows="4" required></textarea>
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" routerLink="/leave">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="!leaveForm.valid">Submit Leave</button>
        </div>
      </form>
    </div>
  </div>
</div>`
  },
  {
    path: 'modules/leave/leave-details/leave-details.component.ts',
    content: `import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../../../core/services/leave.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html'
})
export class LeaveDetailsComponent implements OnInit {
  leave: any = null;
  role: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole() || 'HOD';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.leave = this.leaveService.getLeaveById(id);
    }
  }

  updateStatus(status: string) {
    if (this.leave) {
      this.leave.status = status;
      alert(\`Leave \${status} successfully.\`);
      this.router.navigate(['/leave']);
    }
  }
}`
  },
  {
    path: 'modules/leave/leave-details/leave-details.component.html',
    content: `<div class="container mt-4">
  <div class="card shadow-sm" style="max-width: 600px; margin: auto;" *ngIf="leave">
    <div class="card-header bg-info text-white">
      <h4 class="mb-0">Leave Details</h4>
    </div>
    <div class="card-body">
      <p><strong>Staff Name:</strong> {{ leave.staffName }}</p>
      <p><strong>From Date:</strong> {{ leave.fromDate }}</p>
      <p><strong>To Date:</strong> {{ leave.toDate }}</p>
      <p><strong>Reason:</strong> {{ leave.reason }}</p>
      <p>
        <strong>Status:</strong> 
        <span class="badge" 
              [ngClass]="{'bg-success': leave.status === 'Approved', 'bg-warning': leave.status === 'Pending', 'bg-danger': leave.status === 'Rejected'}">
          {{ leave.status }}
        </span>
      </p>

      <div class="mt-4" *ngIf="role === 'HOD' && leave.status === 'Pending'">
        <button class="btn btn-success me-2" (click)="updateStatus('Approved')">Approve</button>
        <button class="btn btn-danger" (click)="updateStatus('Rejected')">Reject</button>
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-secondary" routerLink="/leave">Back to List</button>
    </div>
  </div>
  
  <div class="alert alert-danger text-center mt-4" *ngIf="!leave">
    Leave record not found.
    <br><br>
    <button class="btn btn-secondary" routerLink="/leave">Back to List</button>
  </div>
</div>`
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
          <button class="btn btn-sm btn-info me-2" [routerLink]="['/leave/details', leave.id]">View</button>
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

console.log('All forms and actions updated successfully!');
