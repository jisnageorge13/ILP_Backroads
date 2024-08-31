import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  template: `<p-confirmDialog></p-confirmDialog>`,
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  @Input() dialogHeader = 'Confirmation';
  @Input() dialogIcon = 'pi pi-exclamation-triangle';
  @Input() message = '';
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  /**
   * On component initialization, display confirmation dialog box and its contents.
   */
  ngOnInit()
  {   
    this.confirmationService.confirm({
     header: this.dialogHeader,
     icon: this.dialogIcon,
     message: this.message,
     accept: () => {
        this.onConfirm.emit();
     }
    });
  }
 }



