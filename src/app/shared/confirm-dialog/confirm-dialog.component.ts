import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  template: `<p-confirmDialog></p-confirmDialog>`,
  styleUrl: './confirm-dialog.component.css',
})

/** 
* This component is a common confirmation dialog used to prompt users with a confirmation message before performing an action.
* It has the following fields:
*
* Dialog Configuration:
* - dialogHeader: An input field to set the title of the confirmation dialog.
*                 Defaults to 'Confirmation'.
* - dialogIcon:   An input field to set the icon displayed in the confirmation 
*                 dialog. Defaults to 'pi pi-exclamation-triangle'.
* - message:      An input field to set the confirmation message displayed 
*                 to the user.
*
* Event Emitter:
* - Confirm:    An output event emitter that emits when the user confirms
*                 the action. The event is emitted when the 'accept' button 
*                 is clicked in the dialog.
* 
* - Reject:     An output event emitter that emits when the user rejects
*                 the action. The event is emitted when the 'reject' button 
*                 is clicked in the dialog.
*
* Behavior:
* - On component initialization, the confirmation dialog is displayed with
*   the configured header, icon, and message.
* - When the user clicks the 'accept' button in the dialog, the `Confirm`
*   event is emitted, allowing the parent component to handle the confirmed 
*   action.
*/

export class ConfirmDialogComponent implements OnInit  {
  @Input() dialogHeader = 'Confirmation';
  @Input() dialogIcon = 'pi pi-exclamation-triangle';
  @Input() message! : string;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() reject: EventEmitter<void> = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  /**
   * Method to display confirmation dialog box and its contents.
   */
  ngOnInit() {
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