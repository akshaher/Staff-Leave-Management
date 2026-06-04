const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app');

function createComponent(base, className, selector) {
  const name = path.basename(base);
  return [
    { path: `${base}/${name}.component.ts`, content: `import { Component, OnInit } from '@angular/core';\n\n@Component({\n  selector: '${selector}',\n  templateUrl: './${name}.component.html',\n  styleUrls: ['./${name}.component.css']\n})\nexport class ${className} implements OnInit {\n  constructor() { }\n  ngOnInit(): void { }\n}` },
    { path: `${base}/${name}.component.html`, content: `<p>${name} works!</p>` },
    { path: `${base}/${name}.component.css`, content: `/* ${name} styles */` }
  ];
}

const filesToCreate = [
  { path: 'core/guards/auth.guard.ts', content: `import { Injectable } from '@angular/core';\nimport { CanActivate } from '@angular/router';\n\n@Injectable({ providedIn: 'root' })\nexport class AuthGuard implements CanActivate {\n  canActivate() { return true; }\n}` },
  { path: 'core/guards/role.guard.ts', content: `import { Injectable } from '@angular/core';\nimport { CanActivate } from '@angular/router';\n\n@Injectable({ providedIn: 'root' })\nexport class RoleGuard implements CanActivate {\n  canActivate() { return true; }\n}` },
  // Core Interceptors
  { path: 'core/interceptors/auth.interceptor.ts', content: `import { Injectable } from '@angular/core';\nimport { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';\nimport { Observable } from 'rxjs';\n\n@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n    return next.handle(req);\n  }\n}` },
  // Core Services
  { path: 'core/services/auth.service.ts', content: `import { Injectable } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class AuthService { }` },
  { path: 'core/services/user.service.ts', content: `import { Injectable } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class UserService { }` },
  { path: 'core/services/leave.service.ts', content: `import { Injectable } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class LeaveService { }` },
  { path: 'core/services/storage.service.ts', content: `import { Injectable } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class StorageService { }` },
  // Core Models
  { path: 'core/models/user.model.ts', content: `export interface User { id?: string; name: string; username: string; email: string; contactNumber: string; department: string; profileImage?: string; role?: string; }` },
  { path: 'core/models/leave.model.ts', content: `export interface Leave { id?: string; userId: string; fromDate: string; toDate: string; reason: string; status: string; }` },
  { path: 'core/models/auth.model.ts', content: `export interface AuthResponse { token: string; user: any; }` },

  // Shared Components
  ...createComponent('shared/components/header', 'HeaderComponent', 'app-header'),
  ...createComponent('shared/components/sidebar', 'SidebarComponent', 'app-sidebar'),
  ...createComponent('shared/components/loader', 'LoaderComponent', 'app-loader'),
  
  // Shared Pipes
  { path: 'shared/pipes/search.pipe.ts', content: `import { Pipe, PipeTransform } from '@angular/core';\n\n@Pipe({ name: 'search' })\nexport class SearchPipe implements PipeTransform {\n  transform(value: any, ...args: any[]) { return value; }\n}` },
  { path: 'shared/pipes/sort.pipe.ts', content: `import { Pipe, PipeTransform } from '@angular/core';\n\n@Pipe({ name: 'sort' })\nexport class SortPipe implements PipeTransform {\n  transform(value: any, ...args: any[]) { return value; }\n}` },

  // Layouts
  ...createComponent('layout/auth-layout', 'AuthLayoutComponent', 'app-auth-layout'),
  { path: 'layout/main-layout/main-layout.component.html', content: `<!-- Main Layout -->\n<app-header></app-header>\n<div class="d-flex">\n  <app-sidebar></app-sidebar>\n  <main class="content p-4 w-100">\n    <router-outlet></router-outlet>\n  </main>\n</div>` },
  { path: 'layout/auth-layout/auth-layout.component.html', content: `<!-- Auth Layout -->\n<div class="auth-wrapper">\n  <router-outlet></router-outlet>\n</div>` },

  // Auth Module
  ...createComponent('modules/auth/login', 'LoginComponent', 'app-login'),
  ...createComponent('modules/auth/register', 'RegisterComponent', 'app-register'),
  
  // Dashboard Module
  ...createComponent('modules/dashboard/dashboard', 'DashboardComponent', 'app-dashboard'),
  
  // Staff Module
  ...createComponent('modules/staff/staff-list', 'StaffListComponent', 'app-staff-list'),
  ...createComponent('modules/staff/add-staff', 'AddStaffComponent', 'app-add-staff'),
  ...createComponent('modules/staff/view-staff', 'ViewStaffComponent', 'app-view-staff'),
  
  // Leave Module
  ...createComponent('modules/leave/leave-list', 'LeaveListComponent', 'app-leave-list'),
  ...createComponent('modules/leave/apply-leave', 'ApplyLeaveComponent', 'app-apply-leave'),
  ...createComponent('modules/leave/leave-details', 'LeaveDetailsComponent', 'app-leave-details'),
];



filesToCreate.forEach(file => {
  const fullPath = path.join(baseDir, file.path);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, file.content, 'utf8');
  console.log(`Created ${file.path}`);
});

console.log('All files generated successfully!');
