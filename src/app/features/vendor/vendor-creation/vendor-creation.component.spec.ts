/* eslint-disable @typescript-eslint/no-empty-function */
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { VendorCreationComponent } from './vendor-creation.component';
import { VendorService } from '../services/vendor.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { IDropDownFields } from '../models/vendor.model';

// Mock data
const mockVendorData = {
    id: 1,
    name: 'Vendor 1',
    stateProvinceRegion: 'California',
    country: 'USA',
    email: 'vendor1@example.com',
    phone: '1234567890',
    website: 'https://vendor1.com',
    service: { id: 1 },
    markets: [{ id: 1 }]
};

// Mock service and form
const getVendorServiceFormMock = () => ({
    vendorName: 'Vendor A',
    state: 'California',
    country: 'USA',
    markets: [1],
    email: 'vendor@example.com',
    phone: '1234567890',
    website: 'https://vendor.com',
    service: 1
});

const getService = ():IDropDownFields[]=> [{
   id: 1,
   name:'hotel'
}];

const getMarkets = ():IDropDownFields[] => [{
   id:1,
   name:'India',
}];

const setMockSpy = (vendorService: VendorService, router: Router, messageService: MessageService) => {
    const getMarketsSpy = jest.spyOn(vendorService, 'getMarkets').mockImplementation(() => of(getMarkets()));
    const getServicesSpy = jest.spyOn(vendorService, 'getServices').mockImplementation(() => of(getService()));
    const getVendorByIdSpy = jest.spyOn(vendorService, 'getVendorById').mockImplementation(() => of());
    const addVendorSpy = jest.spyOn(vendorService, 'addVendor').mockImplementation(() => of());
    const updateVendorSpy = jest.spyOn(vendorService, 'updateVendor').mockImplementation(() => of());
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
    const messageServiceSpy = jest.spyOn(messageService, 'add').mockImplementation(() => {});
    return { getMarketsSpy, getServicesSpy, getVendorByIdSpy, addVendorSpy, updateVendorSpy, routerSpy, messageServiceSpy };
};

describe('VendorCreationComponent', () => {

    const setup = () => {
        const fixture = TestBed.createComponent(VendorCreationComponent);
        const component = fixture.componentInstance;
        const vendorService = TestBed.inject(VendorService);
        const router = TestBed.inject(Router);
        const messageService = TestBed.inject(MessageService);
        const spyObj = setMockSpy(vendorService, router, messageService);
        return { fixture, component, spyObj };
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VendorCreationComponent],
            imports: [ ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: Router, useValue: { navigate: jest.fn() } },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } } } },
                { provide: MessageService, useValue: { add: jest.fn() } },
                VendorService
            ],
        }).compileComponents();
    });

    it('should create', () => {
        const { component } = setup();
        expect(component).toBeTruthy();
    });

    it('should create vendor form on component initialization', () => {
        const { component } = setup();
        component.ngOnInit();
        expect(component.addVendorForm).toBeDefined();
    });

    it('should fetch vendor data and bind to form when editing', () => {
        const { component, spyObj } = setup();
        component.ngOnInit();
        expect(spyObj.getVendorByIdSpy).toHaveBeenCalled();
        expect(component.addVendorForm.get('vendorName')?.value).toBe(mockVendorData.name);
    });

    it('should handle vendor form submission and navigate to view page', () => {
        const { component, spyObj } = setup();
        component.addVendorForm.setValue(getVendorServiceFormMock());
        component.submitVendor();
        expect(spyObj.addVendorSpy).toHaveBeenCalled();
        expect(spyObj.routerSpy).toHaveBeenCalledWith(['/vendor/view/1']);
    });
});
