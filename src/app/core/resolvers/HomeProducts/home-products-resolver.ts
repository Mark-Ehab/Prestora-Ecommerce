import { ResolveFn } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const homeProductsResolver: ResolveFn<any> = (route, state) => {
  /* Dependency Injection */
  /* Inject ProductsService service through function injection */
  const productsService = inject(ProductsService);
  return productsService.getAllProducts();
};
