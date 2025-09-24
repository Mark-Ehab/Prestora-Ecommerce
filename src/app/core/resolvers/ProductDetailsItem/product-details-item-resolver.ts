import { ProductsService } from './../../services/products/products.service';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const productDetailsItemResolver: ResolveFn<any> = (route, state) => {
  /* Dependency Injection */
  /* Inject ProductsService service through function injection */
  const productsService = inject(ProductsService);
  return productsService.getSpecficProductDetails(route.paramMap.get('id'));
};
