import {  Routes } from '@angular/router';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';

export const LEAVE_ROUTES: Routes = [
  { path: '', component: LeaveListComponent },
  { path: 'apply', component: ApplyLeaveComponent },
  { path: 'details/:id', component: LeaveDetailsComponent }
];

