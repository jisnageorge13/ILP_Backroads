import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorListingComponent } from './vendor-listing/vendor-listing.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorCreationComponent } from './vendor-creation/vendor-creation.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from "primeng/floatlabel"
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { VendorViewComponent } from './vendor-view/vendor-view.component';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [VendorListingComponent, VendorCreationComponent, VendorViewComponent],
  imports: [CommonModule, SharedModule, VendorRoutingModule, TableModule, ToastModule, FormsModule, FloatLabelModule, ReactiveFormsModule, DropdownModule, ConfirmDialogModule, ToastModule, ButtonModule, MultiSelectModule, InputTextModule, InputGroupModule, InputGroupAddonModule],
  providers: [ConfirmationService, MessageService],
})
export class VendorModule {}
