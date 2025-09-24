import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productDetailsItemResolver } from './product-details-item-resolver';

describe('productDetailsItemResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      productDetailsItemResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
