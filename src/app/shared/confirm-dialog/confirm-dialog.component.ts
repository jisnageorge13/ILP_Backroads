import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <p-confirmDialog [header]="header" [icon]="icon"></p-confirmDialog>
  `,
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  @Input() header: string = 'Confirmation';
  @Input() icon: string = 'pi pi-exclamation-triangle';
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  /**
   * method to confirmation dialog box and its contents.
   */
  showConfirmDialog(message: string): void {
    this.confirmationService.confirm({
      message: message,
      accept: () => {
        this.onConfirm.emit();
      }
    });
  }
}
