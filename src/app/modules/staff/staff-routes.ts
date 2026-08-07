import { Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';

export const STAFF_ROUTES: Routes = [
  { path: '', component: StaffListComponent },
  { path: 'add', component: AddStaffComponent },
  { path: 'view/:id', component: ViewStaffComponent }
];

