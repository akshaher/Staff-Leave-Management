import { Component, OnInit } from '@angular/core';
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
}