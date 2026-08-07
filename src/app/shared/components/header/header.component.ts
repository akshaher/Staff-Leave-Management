import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SplitNamePipe } from '../../pipes/split.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [AsyncPipe, SplitNamePipe]
})
export class HeaderComponent implements OnInit {

  fullName: any;
  name$=this.authService.name$;

  constructor(
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.fullName = this.authService.getUserName();
    this.authService.name$.subscribe((Response)=>{
      console.log(Response);
      
    })

  }

  logout(): void {
    localStorage.clear();
    this.authService.updateName("");
    this.router.navigate(['/login']);

  }

}