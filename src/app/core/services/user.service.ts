import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private staffList = [
    { id: '1', fullName: 'John Doe', username: 'johnd', email: 'john@example.com', mobile: '1234567890', department: 'CS' },
    { id: '2', fullName: 'Jane Smith', username: 'janes', email: 'jane@example.com', mobile: '0987654321', department: 'CS' }
  ];

  getStaffList() {
    return this.staffList;
  }

  getStaffCount() {
    return this.staffList.length;
  }
}