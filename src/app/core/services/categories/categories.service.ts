import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  /* Dependency Injection */
  /* Inject HttpClient service through function injection */
  private readonly httpClient = inject(HttpClient);

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the data of 
  # All Categories got from Route E-Commerce API on '/categories' endpoint
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environment.ecommerceBaseURl}/categories`);
  }
}
