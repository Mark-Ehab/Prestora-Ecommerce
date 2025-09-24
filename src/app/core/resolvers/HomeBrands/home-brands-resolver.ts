import { ResolveFn } from '@angular/router';
import { BrandsService } from '../../services/brands/brands.service';
import { inject } from '@angular/core';

export const homeBrandsResolver: ResolveFn<any> = (route, state) => {
  /* Dependency Injection */
  /* Inject BrandsService service through function injection */
  const brandsService = inject(BrandsService);
  return brandsService.getAllBrands();
};
