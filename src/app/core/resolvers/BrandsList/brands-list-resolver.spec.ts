import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { brandsListResolver } from './brands-list-resolver';

describe('brandsListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => brandsListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
