import { ResolveFn } from '@angular/router';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

export const wishlistItemsResolver: ResolveFn<any> = (route, state) => {
  /* Dependency Injection */
  /* Inject WishlistService service through function injection */
  const wishlistService = inject(WishlistService);
  /* Inject CookieService service through function injection */
  const cookieService = inject(CookieService);
  /* Inject PLATFORM_ID */
  const platformId = inject(PLATFORM_ID);
  /* Check platform */
  if (isPlatformBrowser(platformId)) {
    /* Check if the user is logged in */
    if (cookieService.get('signinToken')) {
      console.log(wishlistService.wishlist());
      return wishlistService.getLoggedUserWishlist();
    } else {
      return true;
    }
  } else {
    return true;
  }
};
