import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-Modal/confirm-Modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LeaveListComponent,
    ApplyLeaveComponent,
    LeaveDetailsComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LeaveModule { }
