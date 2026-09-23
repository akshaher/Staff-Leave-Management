import { DatePipe } from '@angular/common';
import { Component, computed, input, Input, signal } from '@angular/core';

@Component({
  selector: 'app-deferred-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './deferred-card.component.html',
  styleUrl: './deferred-card.component.css'
})
export class DeferredCardComponent {
  username=input<string>();
  userage=input<number>();
  displayName=computed(()=> ` a ${this.username()} has ${this.userage()} year old`);
  currentTime = new Date();

  refreshTime() {
    this.currentTime = new Date();
    console.log('refresh call');
    
    console.log(this.currentTime);
    
  }

  templateCheck(){
    console.log('card component checked');
    
  }

}
