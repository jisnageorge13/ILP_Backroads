import {Directive,ElementRef,Input,AfterViewInit,Renderer2} from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';

/**
 * TruncateTextDirective
    * This directive truncates long text within an element and displays the full text in an overlay panel when hovered.
    * If the text exceeds the available width of its container, it is truncated with an ellipsis (...).
    * Overlay panel
       * If the text is truncated or overflows, an overlay panel will appear on hover to show the full text.
       * For markets if there is more than one market in the list, while hovering on the badge the overlay shows the rest of market list
 */

@Directive({
  selector: '[appTruncateText]',
})
export class TruncateTextDirective implements AfterViewInit {
  @Input() text = '';
  @Input() overlayPanel!: OverlayPanel;
  @Input() isMarket = false;
  @Input() additionalItemsCount = 0;

  isTruncated = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /**
   * Initializes truncation logic after the view is fully loaded.
   */
  ngAfterViewInit() {
    this.applyTruncation();
  }

  /**
   * Calculates truncation and applies necessary styles to limit visible text based on available width.
   */
  applyTruncation() {
    const element = this.el.nativeElement;
    const parent = element.parentElement;

    this.renderer.setStyle(element, 'white-space', 'nowrap');
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'text-overflow', 'ellipsis');
    this.renderer.setStyle(element, 'display', 'block');

    const parentWidth = parent.offsetWidth;
    const siblingWidth = this.getSiblingWidth(element);
    const maxWidth = parentWidth - siblingWidth - 20;
    this.renderer.setStyle(element, 'max-width', `${maxWidth}px`);

    const limit = this.calculateCharacterLimit(maxWidth, this.text);

    const truncatedData = this.truncateText(this.text, limit);
    const displayText = truncatedData.text;
    this.isTruncated = truncatedData.isTruncated;

    this.renderer.setProperty(element, 'textContent', displayText);

    if (this.isTruncated || element.scrollWidth > element.clientWidth) {
      this.setupOverlay(element);
    }
  }

  /**
   * Cuts the text based on a given limit and adds ellipsis if the text is too long
   */
  truncateText( value: string,limit: number): { text: string; isTruncated: boolean } {
    if (!value) return { text: '', isTruncated: false };

    const isTruncated = value.length > limit;
    const text = isTruncated ? value.slice(0, limit) + '...' : value;

    return { text, isTruncated };
  }

  /**
   * Returns the combined width of sibling elements in the parent container.
   */
  getSiblingWidth(element: HTMLElement): number {
    let width = 0;
    const siblings = element.parentElement?.children || [];
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i] as HTMLElement;
      if (sibling !== element) {
        width += sibling.offsetWidth;
      }
    }
    return width;
  }

  /**
   * Determines how many characters can fit into the element’s width using canvas for precise measurement.
   */
  calculateCharacterLimit(maxWidth: number, text: string): number {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      const computedStyle = getComputedStyle(this.el.nativeElement);
      const font =
        computedStyle.font || computedStyle.fontFamily || '16px Arial';
      context.font = font;

      let textWidth = 0;
      let limit = 0;

      for (let i = 0; i < text.length; i++) {
        textWidth += context.measureText(text[i]).width;
        if (textWidth > maxWidth) {
          break;
        }
        limit++;
      }

      return limit;
    }

    return text.length;
  }

  /**
   * Enables hover functionality to show the full text when truncated
   */
  setupOverlay(element: HTMLElement) {
    this.renderer.setStyle(element, 'cursor', 'pointer');

    this.renderer.listen(element, 'mouseenter', (event) => {
      this.showOverlay(event);
    });

    this.renderer.listen(element, 'mouseleave', () => {
      this.overlayPanel.hide();
    });
  }

  /**
   * Displays the full text in the overlay when the element is hovered over
   */
  showOverlay(event: MouseEvent) {
    if (this.isMarket && this.additionalItemsCount > 0) {
      this.overlayPanel.show(event, this.el.nativeElement);
    } else {
      this.overlayPanel.show(event, this.el.nativeElement);
    }
  }
}
