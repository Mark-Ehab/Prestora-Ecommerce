import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  /* Dependency Injection */
  /* Inject CookiesService service through function injection */
  const cookieService = inject(CookieService);
  /* Inject Router service through function injection */
  const router = inject(Router);

  /* Check if user is already logged in */
  if (cookieService.get('signinToken')) {
    return router.parseUrl('/home');
  }
  return true;
};
