import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  staffList: any[] = [];
  searchText = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.userService.getStaffList().subscribe({
      next: (staff) => this.staffList = staff
    });
  }


  get totalPages() {  
    return Math.ceil(this.staffList.length / this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
    }
  }

  getPagesArray() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  deleteStaff(id: string) {
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.userService.deleteStaff(id).subscribe({
        next: () => {
          this.userService.getStaffList().subscribe({
      next: (staff) => this.staffList = staff
    });
          this.staffList = this.staffList.filter(s => s.id !== id);
          if (this.page > this.totalPages && this.totalPages > 0) {
            this.page = this.totalPages;
          }
        }
      });
    }
  }
}
