import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchStaff' })
export class SearchStaffPipe implements PipeTransform {
  transform(staffList: any[], searchText: string): any[] {
    if (!Array.isArray(staffList)) {
      return [];
    }

    if (!searchText) {
      return staffList;
    }

    const query = searchText.toLowerCase().trim();

    return staffList.filter((staff) => {
      const firstName = (staff.fullName || '').split(' ')[0].toLowerCase();

      return firstName.includes(query);
    });
  }
}
