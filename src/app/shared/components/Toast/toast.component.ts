import { Component, Input } from "@angular/core";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    standalone: true,
    imports: [NgClass]
})

export class ToastComponent{
    @Input() show= false;
    @Input() message ='';
    @Input() type: string | undefined
}