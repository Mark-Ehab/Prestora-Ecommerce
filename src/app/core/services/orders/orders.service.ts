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
      shippingAddress
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
      shippingAddress
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the data of all
  # orders of a logged user through Route E-Commerce API on '/orders/user' endpoint
  #------------------------------------------------------------------------------
  # @params: 
  # @param 1: userId: string | undefined
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  getSpecificUserOrders(userId: string | undefined): Observable<any> {
    return this.httpClient.get(
      `${environment.ecommerceBaseURl}/orders/user/${userId}`
    );
  }
}
