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
  @Input() header = 'Confirmation';
  @Input() icon = 'pi pi-exclamation-triangle';
  @Input() message = '';
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  /**
   * method to confirmation dialog box and its contents.
   */
  showConfirmDialog(): void {
    this.confirmationService.confirm({
      message: this.message,
      accept: () => {
        this.onConfirm.emit();
      }
    });
  }
}
