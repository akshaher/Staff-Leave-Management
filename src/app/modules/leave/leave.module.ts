import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';

@NgModule({
  declarations: [
    LeaveListComponent,
    ApplyLeaveComponent,
    LeaveDetailsComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    ReactiveFormsModule
  ]
})
export class LeaveModule { }
