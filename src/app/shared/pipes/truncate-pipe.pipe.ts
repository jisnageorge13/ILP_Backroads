import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe truncates a string to a specified length and appends a suffix if necessary.
 * If the string is `null` or `undefined`, it returns a placeholder value of '---'.
 *
 * example:
 *
 * value: 'This is a long string', maxLength: 10, suffix: '...'
 * Output: 'This is a ...'
 *
 * value: 'Short', maxLength: 10
 * Output: 'Short'
 *
 * value: null
 * Output: '---'
 */
@Pipe({
  name: 'truncate',
  standalone: false,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, maxLength: number = 50, suffix: string = '...'): string {

    if (value==null) {
      return '---';
    }
    return value.length > maxLength ? `${value.slice(0, maxLength)}${suffix}` : value;
  }
}