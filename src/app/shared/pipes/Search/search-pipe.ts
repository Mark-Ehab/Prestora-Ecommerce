import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform<T extends { title: string }>(array: T[], searchKey: string): T[] {
    return array.filter((item) =>
      item?.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }
}
