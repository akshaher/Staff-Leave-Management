import { Component, ContentChild, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements OnChanges {
  @Input() user:{name:string, surname:string} = {name:'akki', surname:'aher'};
  @ContentChild('content') contentRef:any;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterContentInit(){
    console.log('from child component',this.contentRef);
  }
}
