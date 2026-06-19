import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fullName: any;

  constructor(
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.fullName = this.authService.getUserName();

  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}