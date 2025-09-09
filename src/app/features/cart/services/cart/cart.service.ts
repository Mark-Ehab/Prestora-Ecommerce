import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
  # Description: A function that gets an obeservable<any> that holds the response  
  # data of a logged user cart after a product is added to it through posting 
  # product's id to the backend using Route E-Commerce API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  # @param 1: addedProductId: string
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  addProductToCart(addedProductId: string): Observable<any> {
    return this.httpClient.post(
      `${environment.ecommerceBaseURl}/cart`,
      {
        productId: addedProductId,
      },
      this.getCartRequestHeader()
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the data of a
  # logged user cart got from Route E-Commerce API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  getCart(): Observable<any> {
    return this.httpClient.get(
      `${environment.ecommerceBaseURl}/cart`,
      this.getCartRequestHeader()
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function that gets an obeservable<any> that holds the response  
  # data of a logged user cart after a product is removed from it through deleting 
  # product's id from the backend using Route E-Commerce API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  # @param 1: removedProductId: string
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  removeSpecificCartProduct(removedProductId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.ecommerceBaseURl}/cart/${removedProductId}`,
      this.getCartRequestHeader()
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function that gets an obeservable<any> that holds the response  
  # data of a logged user cart after a product quantity on it is updated through  
  # passing product's id and updated count to the backend using Route E-Commerce 
  # API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  # @param 1: updatedProductId: string
  # @param 2: productQuantity: number
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  updateSpecificCartProductQuantity(
    updatedProductId: string,
    productQuantity: number
  ): Observable<any> {
    return this.httpClient.put(
      `${environment.ecommerceBaseURl}/cart/${updatedProductId}`,
      {
        count: productQuantity,
      },
      this.getCartRequestHeader()
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the status of a
  # logged user cart after being deleted through Route E-Commerce API on '/cart' 
  # endpoint
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  clearCart(): Observable<any> {
    return this.httpClient.delete(
      `${environment.ecommerceBaseURl}/cart`,
      this.getCartRequestHeader()
    );
  }
}
