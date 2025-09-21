import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { ordersListResolver } from './orders-list-resolver';

describe('ordersListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => ordersListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
