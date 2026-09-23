import { Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { ParentComponent } from './parent/parent.component';
import { DeferDemoComponent } from './defer-demo/defer-demo.component';

export const STAFF_ROUTES: Routes = [
  { path: '', component: StaffListComponent },
  { path: 'add', component: AddStaffComponent },
  { path: 'view/:id', component: ViewStaffComponent },
  {path: 'parent',  component: ParentComponent},
  {path: 'defer-demo', component: DeferDemoComponent}
];

