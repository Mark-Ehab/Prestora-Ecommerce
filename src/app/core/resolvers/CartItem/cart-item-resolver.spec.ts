import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cartItemResolver } from './cart-item-resolver';

describe('cartItemResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cartItemResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
