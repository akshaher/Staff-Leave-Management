import {  Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/auth/auth-routes').then(
            (m) => m.AUTH_ROUTES,
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard-routes').then(
            (m) => m.DASHBOARD_ROUTES 
          ),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./modules/staff/staff-routes').then((r: any) =>
            r.STAFF_ROUTES ?? r.staffRoutes ?? r.routes ?? [],
          ),
      },
      {
        path: 'leave',
        loadChildren: () =>
          import('./modules/leave/leave-routes').then((m) => m.LEAVE_ROUTES),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/product-routes').then(
            (module) => module.PRODUCT_ROUTES,
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth-routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];


