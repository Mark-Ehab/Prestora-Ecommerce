import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  /* Dependency Injection */
  /* Inject CookieService service through function injection */
  const cookieService = inject(CookieService);

  /*
   * Check if signin token already exists and if called endpoint is one
   * of those that require logged in user token in their headers
   */
  if (
    cookieService.check('signinToken') &&
    (req.url.includes('orders') ||
      req.url.includes('cart') ||
      req.url.includes('wishlist'))
  ) {
    /* Take a clone from sent request then add to it signin token of logged in user as one of its headers */
    req = req.clone({
      setHeaders: { token: cookieService.get('signinToken') },
    });
  }
  return next(req);
};
