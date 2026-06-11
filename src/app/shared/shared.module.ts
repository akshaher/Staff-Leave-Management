import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchStaffPipe } from './pipes/search.pipe';
import { SortStaffPipe } from './pipes/sort.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SearchStaffPipe,
    SortStaffPipe
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
    RouterModule
  ]
})
export class SharedModule { }
