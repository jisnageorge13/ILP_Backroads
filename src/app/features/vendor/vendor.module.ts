import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorListingComponent } from './vendor-listing/vendor-listing.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorCreationComponent } from './vendor-creation/vendor-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel'
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { VendorViewComponent } from './vendor-view/vendor-view.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from 'src/app/interceptors/loading.interceptor';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
@NgModule({
  declarations: [VendorListingComponent, VendorCreationComponent, VendorViewComponent],
  imports: [CommonModule, InputIconModule, IconFieldModule, SharedModule, VendorRoutingModule, TableModule, ToastModule, FormsModule, FloatLabelModule, ReactiveFormsModule, DropdownModule, ConfirmDialogModule, ToastModule, ButtonModule, MultiSelectModule, InputTextModule, InputGroupModule, InputGroupAddonModule, OverlayPanelModule, BadgeModule],
  providers: [
    ConfirmationService, 
    MessageService,
    provideHttpClient(withInterceptors([loadingInterceptor])),
  ],
})
export class VendorModule {}
