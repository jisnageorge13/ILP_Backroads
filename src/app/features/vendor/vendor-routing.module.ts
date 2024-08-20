import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './vendor-listing/listing.component';
import { CreationComponent } from './vendor-creation/creation.component';

const routes: Routes = [
  { path: '', component: ListingComponent },
  { path: 'creation', component: CreationComponent },
  { path: '', redirectTo: 'listing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule {}
