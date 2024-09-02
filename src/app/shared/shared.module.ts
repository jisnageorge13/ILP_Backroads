import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule
  ],
  exports: [
    ErrorMessageComponent,
    ConfirmDialogComponent
  ],
  providers: [ConfirmationService]
})
export class SharedModule { }
