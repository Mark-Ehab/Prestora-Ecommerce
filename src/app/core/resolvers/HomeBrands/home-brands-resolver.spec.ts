import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { homeBrandsResolver } from './home-brands-resolver';

describe('homeBrandsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => homeBrandsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
