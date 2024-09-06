import { TruncateTextDirective } from './truncation.directive';
import { Renderer2, ElementRef } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { TestBed } from '@angular/core/testing';

describe('TruncateTextDirective', () => {
  let directive: TruncateTextDirective;
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let overlayPanel: OverlayPanel;

  beforeEach(() => {
    const mockOverlayPanel = {
      show: jest.fn(),
      hide: jest.fn(),
    };
    
    TestBed.configureTestingModule({
      providers: [
        TruncateTextDirective,
        {
          provide: ElementRef,
          useValue: { nativeElement: document.createElement('div') },
        },
        {
          provide: Renderer2,
          useValue: {
            setProperty: jest.fn(),
            setStyle: jest.fn(),
            listen: jest.fn(),
          },
        },
        {
          provide: OverlayPanel,
          useValue: mockOverlayPanel,
        },
      ],
    });

    directive = TestBed.inject(TruncateTextDirective);
    elementRef = TestBed.inject(ElementRef);
    renderer = TestBed.inject(Renderer2);
    overlayPanel = TestBed.inject(OverlayPanel);
    directive.text = 'Sample text for testing';
    directive.overlayPanel = overlayPanel;
  });

  it('should truncate text correctly', () => {
    const result = directive.truncateText('Hello World', 5);
    expect(result.text).toBe('Hello...');
    expect(result.isTruncated).toBe(true);

    const nonTruncatedResult = directive.truncateText('Hello', 10);
    expect(nonTruncatedResult.text).toBe('Hello');
    expect(nonTruncatedResult.isTruncated).toBe(false);
  });

  it('should calculate sibling width correctly', () => {
    const parentElement = document.createElement('div');
    const siblingElement = document.createElement('span');
    siblingElement.style.width = '100px';

    // Mocking offsetWidth
    Object.defineProperty(siblingElement, 'offsetWidth', { value: 100 });

    // Append the sibling to the parent
    parentElement.appendChild(siblingElement);
    parentElement.appendChild(elementRef.nativeElement); // The directive's element

    // Mock parentElement property
    Object.defineProperty(elementRef.nativeElement, 'parentElement', {
      value: parentElement,
    });

    const width = directive.getSiblingWidth(elementRef.nativeElement);
    expect(width).toBe(100); // Should return 100
  });

  it('should calculate character limit based on maxWidth', () => {
    const limit = directive.calculateCharacterLimit(100, 'Hello World');
    expect(limit).toBeLessThanOrEqual(11); // As we are calculating by measuring character width
  });

  it('should apply truncation and set the max-width style', () => {
    const mockElement = elementRef.nativeElement;

    // Simulate a parent element
    const parentElement = document.createElement('div');
    parentElement.style.width = '200px';
    parentElement.appendChild(mockElement);

    directive.applyTruncation();

    expect(renderer.setProperty).toHaveBeenCalledWith(
      mockElement,
      'textContent',
      expect.any(String)
    );
    expect(renderer.setStyle).toHaveBeenCalledWith(
      mockElement,
      'max-width',
      expect.any(String)
    );
  });

  it('should show overlay on hover if text is truncated', () => {
    // Set text as truncated
    directive.isTruncated = true;

    // Create a mock element and set up overlay
    const mockElement = elementRef.nativeElement;
    directive.setupOverlay(mockElement);

    // Define the type for the mouseenter callback
    type MouseEnterCallback = (event: MouseEvent) => void;

    // Spy on the renderer's listen method to capture the mouseenter callback
    let capturedCallback: MouseEnterCallback | undefined;
    jest.spyOn(renderer, 'listen').mockImplementation((_, event, callback) => {
      if (event === 'mouseenter') {
        capturedCallback = callback as MouseEnterCallback;
      }
      return jest.fn(); // Return a cleanup function for the listener
    });

    // Call setupOverlay to set up the listeners
    directive.setupOverlay(mockElement);

    // Ensure the mouseenter listener was set up
    expect(renderer.listen).toHaveBeenCalledWith(
      mockElement,
      'mouseenter',
      expect.any(Function)
    );

    // Simulate the mouseenter event by calling the captured callback
    if (capturedCallback) {
      capturedCallback(new MouseEvent('mouseenter'));
    } else {
      fail('mouseenter callback was not captured');
    }

    // Check if the overlay's show method was called
    expect(overlayPanel.show).toHaveBeenCalled();
  });

  it('should not show overlay if text is not truncated', () => {
    directive.isTruncated = false;

    const mockElement = elementRef.nativeElement;
    directive.setupOverlay(mockElement);

    expect(renderer.setStyle).not.toHaveBeenCalled();    
    expect(renderer.listen).not.toHaveBeenCalled();    // Even if we try to show the overlay, it shouldn't be shown    
    
    directive.showOverlay(new MouseEvent('mouseenter'));    
    expect(overlayPanel.show).not.toHaveBeenCalled();
    
  });
});
