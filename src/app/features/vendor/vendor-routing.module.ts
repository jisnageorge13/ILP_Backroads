import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorListingComponent } from './vendor-listing/vendor-listing.component';
import { VendorCreationComponent } from './vendor-creation/vendor-creation.component';

const routes: Routes = [
  { path: '', component: VendorListingComponent },
  { path: 'creation', component: VendorCreationComponent },
  { path: 'edit/:id', component: VendorCreationComponent },
  { path: '', redirectTo: 'listing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule {}
