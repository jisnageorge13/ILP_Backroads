import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './vendor-listing/listing.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { CreationComponent } from './vendor-creation/creation.component';
import { TableModule } from 'primeng/table';  
import { FormsModule } from '@angular/forms';  

@NgModule({
  declarations: [ListingComponent, CreationComponent],
  imports: [CommonModule, VendorRoutingModule, TableModule,FormsModule],
})
export class VendorModule {}
