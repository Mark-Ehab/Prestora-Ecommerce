import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cateogriesFilter',
})
export class CateogriesFilterPipe implements PipeTransform {
  transform<T extends { category: { name: string } }>(
    array: T[],
    categoriesFilter: Set<string>
  ): T[] {
    return array.filter((product) => {
      if (categoriesFilter.size) {
        return categoriesFilter.has(product.category.name);
      } else {
        return true;
      }
    });
  }
}
