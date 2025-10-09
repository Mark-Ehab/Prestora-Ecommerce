import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'brandsFilter',
})
export class BrandsFilterPipe implements PipeTransform {
  transform<T extends { brand: { name: string } }>(
    array: T[],
    brandsFilter: Set<string>
  ): T[] {
    return array.filter((product) => {
      if (brandsFilter.size) {
        return brandsFilter.has(product.brand.name);
      } else {
        return true;
      }
    });
  }
}
