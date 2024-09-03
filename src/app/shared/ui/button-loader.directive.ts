import { Directive, ElementRef, Renderer2, Input } from "@angular/core";

@Directive({
  selector: "[appButtonLoader]",
})
export class ButtonLoaderDirective {
  private originalContent: string | null = null;
  isLoading = false;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set appButtonLoader(isLoading: boolean) {
    if (isLoading) {
      if (this.originalContent === null) {
        this.originalContent = this.el.nativeElement.innerHTML;
      }
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', `<i class="pi pi-spin pi-spinner"></i>`);
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    } else {
      if (this.originalContent !== null) {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.originalContent);
      }
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
  }
}