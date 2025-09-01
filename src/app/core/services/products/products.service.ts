import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  /* Dependency Injection */
  /* Inject HttpClient service through function injection */
  private readonly httpClient = inject(HttpClient);

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the data of 
  # All Products got from Route E-Commerce API on '/products' endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @params 1: pageNumber: number (Default Value = 1)
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  getAllProducts(pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(
      `${environment.ecommerceBaseURl}/products?page=${pageNumber}`
    );
  }
}
