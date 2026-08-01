import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HighchartsChartModule,
        DashboardComponent,
        AdminDashboardComponent
    ]
})
export class DashboardModule { }
