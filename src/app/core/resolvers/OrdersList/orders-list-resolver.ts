import { ResolveFn } from '@angular/router';
import { OrdersService } from '../../services/orders/orders.service';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../services/Authentication/authentication.service';

export const ordersListResolver: ResolveFn<any> = (route, state) => {
  /* Dependency Injection */
  /* Inject OrdersService service through function injection */
  const ordersService = inject(OrdersService);
  /* Inject AuthenticationService service through function injection */
  const authenticationService = inject(AuthenticationService);
  return ordersService.getSpecificUserOrders(
    authenticationService.decodeSigninToken()?.id
  );
};
