import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class ConfirmModalComponent {

  @Input() title = 'Confirmation';

  @Input() message = 'Are you sure?';

  @Input() confirmButtonText = 'Yes';

  @Input() cancelButtonText = 'No';

  @Input() visible = false;

  @Output() confirmed = new EventEmitter<void>();

  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}