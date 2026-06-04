import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role = '';

  totalStaff = 25;

  totalLeaves = 10;

  approvedLeaves = 6;

  rejectedLeaves = 2;

  ngOnInit(): void {

    this.role =
      localStorage.getItem('role') || '';

  }

}