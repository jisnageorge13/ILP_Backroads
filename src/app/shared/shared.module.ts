import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TruncatePipe } from './pipes/truncate-pipe.pipe';
import { ListItemsPipe } from './pipes/listItems.pipe';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    ConfirmDialogComponent,
    TruncatePipe,
    ListItemsPipe,
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule
  ],
  exports: [
    ErrorMessageComponent,
    ConfirmDialogComponent,
    TruncatePipe,
    ListItemsPipe,
  ],
  providers: [ConfirmationService]
})
export class SharedModule { }
