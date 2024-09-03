import { Pipe, PipeTransform } from '@angular/core';

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