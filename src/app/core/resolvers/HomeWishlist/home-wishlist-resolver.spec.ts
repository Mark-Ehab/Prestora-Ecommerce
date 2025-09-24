import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { homeWishlistResolver } from './home-wishlist-resolver';

describe('homeWishlistResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => homeWishlistResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
