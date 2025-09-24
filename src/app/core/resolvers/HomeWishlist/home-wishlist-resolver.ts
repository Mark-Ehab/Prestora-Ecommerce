import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WishlistService } from '../../services/wishlist/wishlist.service';

export const homeWishlistResolver: ResolveFn<any> = (route, state) => {
  /* Dependency Injection */
  /* Inject WishlistService service through function injection */
  const wishlistService = inject(WishlistService);
  /* Inject CookieService service through function injection */
  const cookieService = inject(CookieService);
  /* Check if user is signed in or not */
  if (cookieService.check('signinToken')) {
    return wishlistService.getLoggedUserWishlist();
  }
  return true;
};
