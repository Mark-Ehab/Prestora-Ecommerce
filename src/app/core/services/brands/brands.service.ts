import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  /* Dependency Injection */
  /* Inject HttpClient service through function injection */
  private readonly httpClient = inject(HttpClient);

  /* Properties */
  brandsFilterMatch: WritableSignal<boolean> = signal(true);

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the data of 
  # All Brands got from Route E-Commerce API on '/brands' endpoint
  #------------------------------------------------------------------------------
  # @params:pageNumber:number
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  getAllBrands(pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(
      `${environment.ecommerceBaseURl}/brands?page=${pageNumber}`
    );
  }
}
