import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart/cart.service';

export const cartItemResolver: ResolveFn<boolean> = (route, state) => {
  /* Dependency Injection */
  /* Inject CartService service through function injection */
  const cartService = inject(CartService);
  return cartService.getCart();
};
