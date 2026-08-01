import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LeaveService } from '../../../core/services/leave.service';
import { NgIf, NgClass, DatePipe } from '@angular/common';

@Component({
    selector: 'app-leave-details',
    templateUrl: './leave-details.component.html',
    styleUrls: ['./leave-details.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink, NgClass, DatePipe]
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
        next: (leave) => {
          if (leave) {
            this.leaveDetails = leave;
          } else {
            this.router.navigate(['/leave']);
          }
        },
        error: () => this.router.navigate(['/leave'])
      });
    } else {
      this.router.navigate(['/leave']);
    }
  }
}
