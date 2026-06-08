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
    this.role = this.authService.getRole();
    
    if (this.role === 'HOD') {
      this.userService.getStaffCount().subscribe(response => {
        this.staffCount = response.count;
      });
    } else {
      this.leaveService.getLeaveStats().subscribe(stats => {
        this.leaveStats = stats;
      });
    }
  }
}