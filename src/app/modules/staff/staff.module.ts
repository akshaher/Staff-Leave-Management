import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    StaffListComponent,
    AddStaffComponent,
    ViewStaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class StaffModule { }
