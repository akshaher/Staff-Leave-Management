import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  role = '';
  totalStaff = 0;
  totalLeaves = 0;
  approvedLeaves = 0;
  rejectedLeaves = 0;

  private statsSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {

    this.role =
      localStorage.getItem('role') || '';

    if (this.role === 'HOD') {
      this.userService.getStaffCount().subscribe({
        next: (response) => this.totalStaff = response.count
      });
    }

    if (this.role === 'STAFF') {
      this.statsSubscription = this.leaveService.getLeaveStats().subscribe({
        next: (stats) => {
          this.totalLeaves = stats.total;
          this.approvedLeaves = stats.approved;
          this.rejectedLeaves = stats.rejected;
        }
      });
    }

  }

  ngOnDestroy(): void {
    this.statsSubscription?.unsubscribe();
  }

}
