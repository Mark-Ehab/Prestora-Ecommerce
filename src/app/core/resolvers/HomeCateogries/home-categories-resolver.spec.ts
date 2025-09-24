import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { homeCategoriesResolver } from './home-categories-resolver';

describe('homeCategoriesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => homeCategoriesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
