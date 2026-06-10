import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit, OnDestroy {
  leaveList: any[] = [];
  role: string | null = '';
  private leavesSubscription?: Subscription;

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole() || 'HOD';

    this.leavesSubscription = this.leaveService.leaves$.subscribe({
      next: (leaves) => this.leaveList = leaves
    });

    this.leaveService.getAllLeaves().subscribe();
  }

  updateStatus(leave: any, status: string) {
    this.leaveService.updateLeaveStatus(leave.id, status).subscribe();
  }

  ngOnDestroy(): void {
    this.leavesSubscription?.unsubscribe();
  }
}
