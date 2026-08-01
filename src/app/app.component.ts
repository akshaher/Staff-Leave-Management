import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
 protected   title = 'staff-leave-management';
 role:string | null='';


 ngOnChanges(){

 }

}
