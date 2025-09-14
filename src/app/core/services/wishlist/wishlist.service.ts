import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Product } from '../../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  /* Dependency Injection */
  /* Inject HttpClient service through function injection */
  private readonly httpClient = inject(HttpClient);
  /* Inject CookieService service through function injection */
  private readonly cookieService = inject(CookieService);

  /* Properties */
  wishlist: WritableSignal<Product[]> = signal([]);

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A helper function that gets the wishlist request header each time
  # called
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: object
  -----------------------------------------------------------------------------*/
  private getWishlistRequestHeader(): object {
    return {
      headers: {
        token: this.cookieService.get('signinToken'),
      },
    };
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the data of a
  # logged user wishlist got from Route E-Commerce API on '/wishlist' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(
      `${environment.ecommerceBaseURl}/wishlist`,
      this.getWishlistRequestHeader()
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the status of a
  # product added to logged user whishlist through Route E-Commerce API on '/wishlist' 
  # endpoint
  #------------------------------------------------------------------------------
  # @params: 
  # @param 1: addedProductId:string
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  addProductToWishlist(addedProductId: string): Observable<any> {
    return this.httpClient.post(
      `${environment.ecommerceBaseURl}/wishlist`,
      {
        productId: addedProductId,
      },
      this.getWishlistRequestHeader()
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the status of a
  # product removed from logged user wishlist through Route E-Commerce API on  
  # '/wishlist' endpoint
  #------------------------------------------------------------------------------
  # @params: 
  # @param 1: removedProductId:string
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  removeProductFromWishlist(removedProductId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.ecommerceBaseURl}/wishlist/${removedProductId}`,
      this.getWishlistRequestHeader()
    );
  }
}
