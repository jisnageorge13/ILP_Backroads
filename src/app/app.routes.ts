import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'vendor',
    loadChildren: () =>
      import('./features/vendor/vendor.module').then((m) => m.VendorModule),
  },
  { path: '', redirectTo: 'vendor', pathMatch: 'full' },
  { path: '**', redirectTo: 'vendor' },
  
];
