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
      this.leaveList = this.leaveService.getAllLeaves();
    } else {
      this.leaveList = this.leaveService.getLeavesByStaff('currentUser');
    }
  }

  updateStatus(leave: any, status: string) {
    leave.status = status;
  }
}