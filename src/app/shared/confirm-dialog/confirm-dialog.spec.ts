import { TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

describe('ConfirmDialogComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [ConfirmDialogModule],
      providers: [ConfirmationService],
    }).compileComponents();
  });

  const setup = () => {
    const fixture = TestBed.createComponent(ConfirmDialogComponent);
    const component = fixture.componentInstance;
    const confirmationService = TestBed.inject(ConfirmationService);
    return {fixture, component, confirmationService};
  }

  it('should create', () => {
    const {component} = setup();
    expect(component).toBeTruthy();
  });

  it('should display the confirmation popup with the correct header, icon, and message', () => {
    const { component, confirmationService } = setup();
    const spy = jest.spyOn(confirmationService, 'confirm');
    component.dialogHeader = 'Confirmation';
    component.dialogIcon = 'pi pi-exclamation-triangle';
    component.message = 'Are you sure?';
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure?',
    }));
  });

  it('should emit "confirm" when user clicks on "Yes" in the confirmation popup', () => {
    const { component, confirmationService } = setup();
    const spyOnConfirm = jest.spyOn(component.confirm, 'emit');
    jest.spyOn(confirmationService, 'confirm').mockImplementation((confirmation) => {
        if (confirmation.accept) {
          confirmation.accept();
        }
        return confirmationService;
      });
    component.ngOnInit();
    expect(spyOnConfirm).toHaveBeenCalled();
  });

  it('should emit "reject" when user clicks on "No" in the confirmation popup', () => {
    const { component, confirmationService } = setup();
    const spyOnReject = jest.spyOn(component.reject, 'emit'); // Updated to use `reject`
    jest.spyOn(confirmationService, 'confirm').mockImplementation((confirmation) => {
        if (confirmation.reject) {
          confirmation.reject();
        }
        return confirmationService;
      });
    component.ngOnInit();
    expect(spyOnReject).toHaveBeenCalled();
  });
});