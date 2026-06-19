import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HighchartsChartModule
  ]
})
export class DashboardModule { }
