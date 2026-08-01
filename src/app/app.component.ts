import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {
 protected   title = 'staff-leave-management';
 role:string | null='';


 ngOnInit(){

 }
 ngOnChanges(){

 }

}
