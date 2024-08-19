import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-vendor-listing',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule,DropdownModule],
  templateUrl: './vendor-listing.component.html',
  styleUrl: './vendor-listing.component.css',
})
export class VendorListingComponent implements OnInit  {
  value: string | undefined;
  cities: City[] | undefined;

    selectedCity: City | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            // { name: 'London', code: 'LDN' },
            // { name: 'Istanbul', code: 'IST' },
            // { name: 'Paris', code: 'PRS' }
        ];
    }
}
