import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../core/models/product.interface';

@Pipe({
  name: 'onSale',
})
export class OnSalePipe implements PipeTransform {
  transform(products: Product[]): Product[] {
    return products.filter((product) => product.priceAfterDiscount);
  }
}
