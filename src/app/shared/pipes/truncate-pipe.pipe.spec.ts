import { TestBed } from '@angular/core/testing';
import { TruncatePipe } from './truncate-pipe.pipe';

describe('TruncatePipePipe', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [TruncatePipe],
    }).compileComponents();
  });

  const setup = () => {
    const pipe = new TruncatePipe();
    return { pipe };
  };

  it('create an instance', () => {
    const {pipe} = setup();
    expect(pipe).toBeTruthy();
  });

  it('should return "---" if the value is undefined', () => {
    const {pipe} = setup();
    const result = pipe.transform(undefined);
    expect(result).toBe('---');
  });
  
  it('should return "---" if the value is null', () => {
    const {pipe} = setup();
    const result = pipe.transform(null as unknown as string);
    expect(result).toBe('---');
  });
 
  it('should return the original string if it is shorter than the maximum length', () => {
    const {pipe} = setup();
    const shortText = 'Hello';
    const result = pipe.transform(shortText, 10);
    expect(result).toBe(shortText);
  });
 
  it('should truncate the string and append the custom suffix if it exceeds the maximum length', () => {
    const {pipe} = setup();
    const longText = 'This is a very long sample text that should be truncated';
    const result = pipe.transform(longText, 10);
    expect(result).toBe('This is a ...');
  });
 
  it('should return the original string if it exactly matches the maximum length', () => {
    const {pipe} = setup();
    const text = 'maximumlength';
    const result = pipe.transform(text, text.length);
    expect(result).toBe(text);
  });
 
  it('should return an empty string if the value is an empty string', () => {
    const {pipe} = setup();
    const result = pipe.transform('', 10);
    expect(result).toBe('');
  });
});