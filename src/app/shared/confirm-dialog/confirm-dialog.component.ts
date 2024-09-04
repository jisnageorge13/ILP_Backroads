import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  template: `<p-confirmDialog></p-confirmDialog>`,
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent  {
  @Input() dialogHeader = "Confirmation";
  @Input() dialogIcon = "pi pi-exclamation-triangle";
  @Input() message = "";
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() reject: EventEmitter<void> = new EventEmitter<void>();
  constructor(private confirmationService: ConfirmationService) {}

  /**
   * method to display confirmation dialog box and its contents.
   */
  @Input() set confirmDialog(isview: boolean) {
    if(isview)
    {
      this.confirmationService.confirm({ header: this.dialogHeader, icon: this.dialogIcon, message: this.message,
        accept: () => {
          this.confirm.emit();
        },
        reject: () => {
          this.reject.emit();
        },
      });
    }
}
}