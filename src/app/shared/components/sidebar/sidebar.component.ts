import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: string | null = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Defaulting to 'HOD' for dummy testing if not set
    this.role = this.authService.getRole() || 'HOD';
  }
}