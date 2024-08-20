import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './vendor-listing/listing.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { CreationComponent } from './vendor-creation/creation.component';

@NgModule({
  declarations: [ListingComponent, CreationComponent],
  imports: [CommonModule, VendorRoutingModule],
})
export class VendorModule {}
