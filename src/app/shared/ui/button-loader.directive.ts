import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appButtonLoader]',
})

/**
* This directive is used to display a loading spinner on a button element  and disable the button to prevent 
* multiple submissions.
*
* It has the following fields and behaviors:
* - originalContent: A private field that stores the original content 
*                    (innerHTML) of the button before the loading spinner 
*                    is displayed.
* - isLoading:       A boolean field that indicates whether the loading 
*                    spinner should be displayed. Defaults to `false`.
*
* Inputs:
* - appButtonLoader: An input property that controls the loading state of 
*                    the button. When set to `true`, the button displays a 
*                    loading spinner and is disabled; when set to `false`, 
*                    the button reverts to its original content and is 
*                    enabled.
*
* - When `appButtonLoader` is set to `true`:
*   - The original content of the button is stored in the `originalContent` 
*     field if it hasn't been stored already.
*   - The button's innerHTML is replaced with a loading spinner icon.
*   - The button is disabled to prevent further interactions.
*
* - When `appButtonLoader` is set to `false`:
*   - The button's original content is restored from the `originalContent` field.
*   - The button is re-enabled, allowing user interactions.
*/

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