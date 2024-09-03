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
@NgModule({
  declarations: [
    ErrorMessageComponent,
    ConfirmDialogComponent,
    LoaderComponent,
    BreadcrumbComponent,
    ButtonLoaderDirective,
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    BreadcrumbModule
  ],
  exports: [
    ErrorMessageComponent,
    ConfirmDialogComponent,
    LoaderComponent,
    BreadcrumbComponent,
    ButtonLoaderDirective,
  ],
  providers: [ConfirmationService]
})
export class SharedModule { }
