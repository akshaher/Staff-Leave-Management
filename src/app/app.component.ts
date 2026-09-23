import { Component, OnChanges, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnChanges, OnInit {
 protected   title = 'staff-leave-management';
 role:string | null='';


 ngOnInit(){

 }
 ngOnChanges(){

 }

 templateCheck(){
    console.log('App template checked ');
    
 }
}
