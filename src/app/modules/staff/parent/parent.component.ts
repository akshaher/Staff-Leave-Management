import { NgStyle } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [NgStyle, ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent implements OnInit{

  user:{name:string, surname:string}={name : 'John', surname : 'DON'}
  @ViewChild('titleRef', {static: false}) titleReference: any

  constructor(){
    console.log('1. parent constructor called', this.titleReference);
  }

  ngOnInit(){
    console.log('2. OnInit called', this.titleReference?.nativeElement.innerText);
  }

  ngDoCheck(){
    console.log('3. ngDoCheck called'); 
  }

  ngAfterContentInit(){
    console.log('4. After Content Init');
  }

  ngAfterContentChecked(){
    console.log('5. After Content Checked');
  }

  ngAfterViewInit(){
    console.log('6. After View Init', this.titleReference.nativeElement.innerText);
  }

  ngAfterViewChecked(){
    console.log('7. View Checked');
  }

  ngOnDestroy(){
    console.log('8. onDestroy called');
    
  }

  changeName(){
    this.user ={name:'new name', surname: 'new Surname'}
  }
}
