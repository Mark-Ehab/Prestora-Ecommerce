import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { categoriesListResolver } from './categories-list-resolver';

describe('categoriesListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => categoriesListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
