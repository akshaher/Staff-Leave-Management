import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 protected   title = 'staff-leave-management';
 role:string | null='';

 ngOnInit(){
  console.log("AppComponent Initialized");
  this.role= localStorage.getItem('role');
 }
}
