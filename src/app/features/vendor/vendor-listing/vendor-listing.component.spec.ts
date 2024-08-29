import { TableModule } from 'primeng/table';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VendorListingComponent } from './vendor-listing.component';
import { IVendor } from '../models/vendor.model';
import { VendorService } from '../services/vendor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('VendorListingComponent', () => {
  const mockVendors: IVendor[] = [
    {
      id: 1,
      name: 'Vendor A',
      stateProvinceRegion: 'Region A',
      country: 'Country A',
      email: 'vendorA@example.com',
      phone: '9999999999',
      website: 'http://vendora.com',
      isApproved: true,
      service: { id: 1, name: 'Service A' },
      markets: [
        { id: 1, name: 'Market A' },
        { id: 2, name: 'Market B' },
      ],
    },
    {
      id: 2,
      name: 'Vendor B',
      stateProvinceRegion: 'Region B',
      country: 'Country B',
      email: 'vendorB@example.com',
      phone: '9879879861',
      website: 'http://vendorb.com',
      isApproved: false,
      service: { id: 2, name: 'Service B' },
      markets: [
        { id: 2, name: 'Market B' },
        { id: 3, name: 'Market C' },
      ],
    },
    {
      id: 3,
      name: 'Vendor C',
      stateProvinceRegion: 'Region C',
      country: 'Country C',
      email: 'vendorC@example.com',
      phone: '9090909090',
      website: 'http://vendorc.com',
      isApproved: true,
      service: { id: 3, name: 'Service C' },
      markets: [
        { id: 1, name: 'Market A' },
        { id: 3, name: 'Market C' },
      ],
    },
  ];

  const setMockSpy = (vendorService: VendorService) => {
    const getVendorsSpy = jest
      .spyOn(vendorService, 'getVendors')
      .mockImplementation(() => of(mockVendors));
    return { getVendorsSpy };
  };

  const setup = () => {
    const fixture = TestBed.createComponent(VendorListingComponent);
    const component = fixture.componentInstance;
    const vendorService = TestBed.inject(VendorService);
    const spyObj = setMockSpy(vendorService);
    return { fixture, component, spyObj };
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorListingComponent],
      imports: [HttpClientTestingModule, TableModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [VendorService],
    }).compileComponents();
  });

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should list all the vendors when the user navige to the page', () => {
    const { component, spyObj } = setup();
    component.ngOnInit();
    expect(spyObj.getVendorsSpy).toHaveBeenCalled();
    expect(component.vendors).toEqual(mockVendors);
  });

  it('should fetch and sort vendors by name', () => {
    const { component } = setup();
    component.fetchVendors();
    expect(component.vendors).toEqual(mockVendors);
    expect(component.vendors[0].name).toBe('Vendor A');
    expect(component.vendors[1].name).toBe('Vendor B');
  });

  it('should display "Pending" tag for unapproved vendors', () => {
    const { component } = setup();
    component.fetchVendors();
    const unapprovedVendor = component.vendors.find(
      (vendor) => !vendor.isApproved
    );
    expect(unapprovedVendor).toBeDefined();
    expect(unapprovedVendor?.isApproved).toBe(false);
  });
});
