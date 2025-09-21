import { ResolveFn } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { inject } from '@angular/core';

export const categoriesListResolver: ResolveFn<any> = (route, state) => {
  /* Dependency Injection */
  /* Inject CategoriesService service through function injection */
  const categoriesService = inject(CategoriesService);
  return categoriesService.getAllCategories();
};
