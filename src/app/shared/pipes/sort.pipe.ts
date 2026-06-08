import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortStaff' })
export class SortStaffPipe implements PipeTransform {
  transform(staffList: any[]): any[] {
    if (!Array.isArray(staffList)) {
      return [];
    }

    return [...staffList].sort((firstStaff, secondStaff) => {
      const firstName = (firstStaff.fullName || '').toLowerCase();
      const secondName = (secondStaff.fullName || '').toLowerCase();

      return firstName.localeCompare(secondName);
    });
  }
}
