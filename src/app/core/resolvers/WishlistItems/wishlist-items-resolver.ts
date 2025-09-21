import { ResolveFn } from '@angular/router';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { inject } from '@angular/core';

export const wishlistItemsResolver: ResolveFn<any> = (route, state) => {
  /* Dependency Injection */
  /* Inject WishlistService service through function injection */
  const wishlistService = inject(WishlistService);
  return wishlistService.getLoggedUserWishlist();
};
