import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listItems',
})
export class ListItemsPipe implements PipeTransform {
  transform(listItems: Array<{ name: string } | string>, limit: number = listItems.length): { transformedList: string, length: number } {
    const length = listItems.length;
    let transformedList: string;

    if (length === 0) {
      transformedList = '';
    } else if (length <= limit) {
      transformedList = listItems.map(item => typeof item === 'string' ? item : item.name).join(', ');
    } else {
      transformedList = listItems.slice(0, limit).map(item => typeof item === 'string' ? item : item.name).join(', ');
    }
    
    return { transformedList, length };
  }
}
