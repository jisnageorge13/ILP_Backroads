import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { LoaderComponent } from './loader/loader.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonLoaderDirective } from './ui/button-loader.directive';
import { TruncateTextDirective } from './ui/truncation.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    ErrorMessageComponent,
    ConfirmDialogComponent,
    BreadcrumbComponent,
    ButtonLoaderDirective,
    TruncateTextDirective
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    BreadcrumbModule
  ],
  exports: [
    LoaderComponent,
    ErrorMessageComponent,
    ConfirmDialogComponent,
    BreadcrumbComponent,
    ButtonLoaderDirective,
    TruncateTextDirective
  ],
  providers: [ConfirmationService]
})
export class SharedModule { }
