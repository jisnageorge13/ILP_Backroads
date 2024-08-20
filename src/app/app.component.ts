import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { VendorListingComponent } from './components/vendor-listing.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, VendorListingComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Backroads';
}
