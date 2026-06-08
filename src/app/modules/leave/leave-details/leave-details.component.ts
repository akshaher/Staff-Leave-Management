import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../../../core/services/leave.service';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css']
})
export class LeaveDetailsComponent implements OnInit {
  leaveDetails: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.leaveService.getLeaveById(id).subscribe({
        next: (leave) => this.leaveDetails = leave,
        error: () => this.router.navigate(['/leave'])
      });
    } else {
      this.router.navigate(['/leave']);
    }
  }
}
