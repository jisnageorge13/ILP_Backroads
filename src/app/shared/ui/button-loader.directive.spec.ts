import { TestBed } from '@angular/core/testing';
import { ButtonLoaderDirective } from './button-loader.directive';
import { Component, Renderer2 } from '@angular/core';

@Component({
  template: `<button [appButtonLoader]='isLoading'>Submit</button>`,
})
class TestButtonComponent {
  isLoading = false;
}
describe('ButtonLoaderDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonLoaderDirective, TestButtonComponent],
      providers: [Renderer2] 
    }).compileComponents();
  });

  const setup = () => {
    const fixture = TestBed.createComponent(TestButtonComponent);
    const component = fixture.componentInstance;
    const button = fixture.nativeElement.querySelector('button');
    const renderer = TestBed.inject(Renderer2);
    return { fixture, component, button, renderer };
  };

  it('should create', () => {
    const {component} = setup();
    expect(component).toBeTruthy();
  });

  it('should show a spinner and prevent user from clicking again when the button is loading', () => {
    const { fixture, button, component } = setup();
    component.isLoading = true;
    fixture.detectChanges(); 
    expect(button.innerHTML).toContain('pi-spinner');
    expect(button.disabled).toBeTruthy();
  });

  it('should show normal button text and allow user to click when the button finishes loading', () => {
    const { fixture, component, button } = setup();
    component.isLoading = true;
    fixture.detectChanges();
    component.isLoading = false;
    fixture.detectChanges();
    expect(button.innerHTML).toBe('Submit'); 
    expect(button.disabled).toBeFalsy();
  });

  it('should show normal and loading state correctly when user clicks on the button', () => {
    const { fixture, component, button } = setup();
    const originalContent = button.innerHTML;
    component.isLoading = true;
    fixture.detectChanges();
    const spinnerContent = button.innerHTML;
    component.isLoading = false;
    fixture.detectChanges();
    expect(button.innerHTML).toBe(originalContent);
    component.isLoading = true;
    fixture.detectChanges();
    expect(button.innerHTML).toBe(spinnerContent);
    expect(button.innerHTML).toContain('pi-spinner');
    expect(button.innerHTML).not.toBe(originalContent);
  });
});