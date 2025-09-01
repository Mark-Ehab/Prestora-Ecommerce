import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /* Dependency Injection */
  /* Inject HttpClient service through function injection */
  private readonly httpClient = inject(HttpClient);

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the response   
  # data after a register form is submitted through posting register form data to
  # Route E-Commerce API on '/auth/signup' endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @Param(1): FormData:object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  submitRegisterForm(FormData: object): Observable<any> {
    return this.httpClient.post(
      `${environment.ecommerceBaseURl}/auth/signup`,
      FormData
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the response   
  # data after a login form is submitted through posting login form data to
  # Route E-Commerce API on '/auth/signin' endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @Param(1): FormData:object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  submitLoginForm(FormData: object): Observable<any> {
    return this.httpClient.post(
      `${environment.ecommerceBaseURl}/auth/signin`,
      FormData
    );
  }
}
