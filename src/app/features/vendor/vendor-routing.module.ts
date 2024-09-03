import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorListingComponent } from './vendor-listing/vendor-listing.component';
import { VendorCreationComponent } from './vendor-creation/vendor-creation.component';
import { VendorViewComponent } from './vendor-view/vendor-view.component';

const routes: Routes = [
  { path: '',  component: VendorListingComponent, pathMatch: 'full', data: { breadcrumb: '' } },
  { path: 'creation', component: VendorCreationComponent, data: { breadcrumb: 'Create Vendor' } },
  { path: 'view/:id', component: VendorViewComponent, data: { breadcrumb: 'View Vendor' } },
  { path: 'edit/:id', component: VendorCreationComponent, data: { breadcrumb: 'Edit Vendor' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule {}
