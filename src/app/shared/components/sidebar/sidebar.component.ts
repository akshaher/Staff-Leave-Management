import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive]
})
export class SidebarComponent implements OnInit {
  role: string | null = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Defaulting to 'HOD' for dummy testing if not set
    this.role = this.authService.getUserRole();
    console.log(this.role);
    
  }
}