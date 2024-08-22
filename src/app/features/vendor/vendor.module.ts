import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './vendor-listing/listing.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorCreationComponent } from './vendor-creation/vendor-creation.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from "primeng/floatlabel"

@NgModule({
  declarations: [ListingComponent, VendorCreationComponent],
  imports: [CommonModule,VendorRoutingModule,FormsModule,FloatLabelModule,ReactiveFormsModule,DropdownModule,ConfirmDialogModule, ToastModule, ButtonModule,MultiSelectModule,InputTextModule,InputGroupModule,InputGroupAddonModule],
  
})
export class VendorModule {}
