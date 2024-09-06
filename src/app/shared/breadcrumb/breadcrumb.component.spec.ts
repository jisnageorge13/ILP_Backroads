import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared.module';
import { MenuItem } from 'primeng/api';

describe('BreadcrumbComponent', () => {
  let routerEventsSubject: Subject<any>;

  beforeEach(async () => {
    routerEventsSubject = new Subject();

    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [RouterTestingModule, SharedModule], 
      providers: [
        {
          provide: Router,
          useValue: {
            events: routerEventsSubject.asObservable(),
            navigate: jest.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            root: {
              children: [],
              snapshot: {
                url: [],
                data: {},
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  const setup = () => {
    const fixture = TestBed.createComponent(BreadcrumbComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const activatedRoute = TestBed.inject(ActivatedRoute);
    return { fixture, component, router, activatedRoute };
  };
  
  it('should create', () => {
    const {component} = setup();
    expect(component).toBeTruthy();
  });

  it('should initialize home breadcrumb item on init', () => {
    const { component } = setup();
    component.ngOnInit();
    expect(component.home).toEqual({ icon: 'pi pi-home', routerLink: '' });
  });

  it('should update breadcrumbs when route changes', () => {
    const { component } = setup();

    component.breadcrumbItems = [
      { label: 'Home', routerLink: '/' },
    ];

    const newBreadcrumbs: MenuItem[] = [
      { label: 'Page', routerLink: '/page' },
      { label: 'Page1', routerLink: '/page/page1' },
    ];

    const updatedBreadcrumbs = component.updateBreadcrumbs(
      component.breadcrumbItems,
      newBreadcrumbs
    );

    expect(updatedBreadcrumbs.length).toBe(1);
    expect(updatedBreadcrumbs[0].label).toBe('Home');
  });

  it('should build breadcrumbs based on route data', () => {
    const { component } = setup();
    jest.spyOn(component, 'buildBreadcrumb').mockReturnValue([
      { label: 'Home', routerLink: '/' },
    ]);

    component.ngOnInit();
    routerEventsSubject.next(new NavigationEnd(0, '', ''));

    expect(component.breadcrumbItems.length).toBe(0);
  });

  it('should navigate when breadcrumb is clicked', () => {
    const { component, router } = setup();
    component.onBreadcrumbClick('vendor/section/page');
    expect(router.navigate).toHaveBeenCalledWith(['/vendor/section/page']);
  });

});
