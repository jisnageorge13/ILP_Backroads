import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  template: `<p-confirmDialog [visible]="visible" header="Confirmation" icon="pi pi-exclamation-triangle" [message]="message" (accept)="confirmChange()" (reject)="rejectChange()"> </p-confirmDialog>`,
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent  { 

  @Input() visible = false;
  @Input() message = '';
  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Output() reject: EventEmitter<void> = new EventEmitter();

  
  /**
   * Method to handle when accept case occur
   * @returns { void }
   */
  confirmChange(): void {
    this.confirm.emit();
    this.visible = false;
  }

  /**
   * Method to handle when reject case occur
   * @returns { void }
   */
  rejectChange(): void {
    console.log("reject")
    this.reject.emit();
    this.visible = false;
  }
}