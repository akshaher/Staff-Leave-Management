import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  staffList: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.staffList = this.userService.getStaffList();
  }

  deleteStaff(id: string) {
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.staffList = this.staffList.filter(s => s.id !== id);
    }
  }
}