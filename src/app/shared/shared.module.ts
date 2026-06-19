import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchStaffPipe } from './pipes/search.pipe';
import { SortStaffPipe } from './pipes/sort.pipe';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from './components/confirm-Modal/confirm-Modal.component';
import { ToastComponent } from './components/Toast/toast.component';
import { SplitNamePipe } from './pipes/split.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SearchStaffPipe,
    SortStaffPipe,
    ConfirmModalComponent,
    ToastComponent,
    SplitNamePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SearchStaffPipe,
    SortStaffPipe,
    ConfirmModalComponent,
    ToastComponent,
    SplitNamePipe,
    RouterModule
  ]
})
export class SharedModule { }
