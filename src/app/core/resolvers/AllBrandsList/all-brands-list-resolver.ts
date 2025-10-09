import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BrandsService } from '../../services/brands/brands.service';
import { forkJoin } from 'rxjs';

export const allBrandsListResolver: ResolveFn<[any, any]> = (route, state) => {
  /* Dependency Injection */
  /* Inject BrandsService service through function injection */
  const brandsService = inject(BrandsService);
  return forkJoin([
    brandsService.getAllBrands(),
    brandsService.getAllBrands(2),
  ]);
};
