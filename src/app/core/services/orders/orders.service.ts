import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  /* Dependency Injection */
  /* Inject HttpClient service through function injection */
  private readonly httpClient = inject(HttpClient);
  /* Inject CookieService service through function injection */
  private readonly cookieService = inject(CookieService);

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A helper function that gets the cart request header each time
  # called
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: object
  -----------------------------------------------------------------------------*/
  private getCartRequestHeader(): object {
    return {
      headers: {
        token: this.cookieService.get('signinToken'),
      },
    };
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the status of a
  # cash payment for a logged user cart through Route E-Commerce API on '/orders' 
  # endpoint
  #------------------------------------------------------------------------------
  # @params: 
  # @param 1: cartId:string
  # @param 2: shippingAddress:Object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  createCashOrder(cartId: string, shippingAddress: Object): Observable<any> {
    return this.httpClient.post(
      `${environment.ecommerceBaseURl}/orders/${cartId}`,
      shippingAddress,
      this.getCartRequestHeader()
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the status of a
  # visa payment for a logged user cart through Route E-Commerce API on '/orders' 
  # endpoint
  #------------------------------------------------------------------------------
  # @params: 
  # @param 1: cartId:string
  # @param 2: shippingAddress:Object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  createVisaOrder(cartId: string, shippingAddress: Object): Observable<any> {
    return this.httpClient.post(
      `${environment.ecommerceBaseURl}/orders/checkout-session/${cartId}?url=${environment.hostURl}`,
      shippingAddress,
      this.getCartRequestHeader()
    );
  }
}
