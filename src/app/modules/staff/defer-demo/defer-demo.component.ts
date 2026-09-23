import { Component } from '@angular/core';
import { DeferredCardComponent } from '../deferred-card/deferred-card.component';

@Component({
  selector: 'app-defer-demo',
  standalone: true,
  imports: [DeferredCardComponent],
  templateUrl: './defer-demo.component.html',
  styleUrl: './defer-demo.component.css'
})
export class DeferDemoComponent {
 interactionCount = 0;
  hoverCount = 0;
  username:string='akshay';
  userage:number=29;

  handleInteraction() {
    this.interactionCount++;
  }

  handleHover() {
    this.hoverCount++;
  }

  updateUser(){
   this.username='Pritam';
   this.userage=32;
  }

  templateCall(){
    console.log('demo component checked');
    
  }
}

