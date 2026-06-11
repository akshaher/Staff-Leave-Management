import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role :string | null= '';
  totalStaff = 0;
  totalLeaves = 0;
  approvedLeaves = 0;
  rejectedLeaves = 0;


  constructor(
    private authService:AuthService,
    private userService: UserService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {

    this.role = this.authService.getRole();

    if (this.role === 'HOD') {
      this.userService.getStaffCount().subscribe({
        next: (response) => this.totalStaff = response.count
      });
    }

    if (this.role === 'STAFF') {
    this.leaveService.getLeaveStats().subscribe({
        next: (stats) => {
          this.totalLeaves = stats.total;
          this.approvedLeaves = stats.approved;
          this.rejectedLeaves = stats.rejected;
        }
      });
    }

  }

}
