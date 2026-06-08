import { Component, OnInit } from '@angular/core';
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
      this.leaveService.getAllLeaves().subscribe({
        next: (leaves) => this.leaveList = leaves
      });
    } else {
      this.leaveService.getLeavesByStaff('currentUser').subscribe({
        next: (leaves) => this.leaveList = leaves
      });
    }
  }

  updateStatus(leave: any, status: string) {
    this.leaveService.updateLeaveStatus(leave.id, status).subscribe({
      next: (updatedLeave) => leave.status = updatedLeave.status
    });
  }
}
