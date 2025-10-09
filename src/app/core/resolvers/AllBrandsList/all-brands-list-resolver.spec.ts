import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { allBrandsListResolver } from './all-brands-list-resolver';

describe('allBrandsListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => allBrandsListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
