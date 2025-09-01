import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  /* Dependency Injection */
  /* Inject HttpClient service through function injection */
  private readonly httpClient = inject(HttpClient);

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the details data  
  # of a specific product got from Route E-Commerce API on '/products' endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @Param(1): productId:string
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  getSpecficProductDetails(productId: string | null): Observable<any> {
    return this.httpClient.get(
      `${environment.ecommerceBaseURl}/products/${productId}`
    );
  }
}
