import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorListingComponent } from './vendor-listing/vendor-listing.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorCreationComponent } from './vendor-creation/vendor-creation.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VendorListingComponent, VendorCreationComponent],
  imports: [CommonModule, VendorRoutingModule, TableModule, FormsModule],
})
export class VendorModule {}
