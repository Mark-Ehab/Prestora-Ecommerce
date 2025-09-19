import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { DecodedSigninToken } from '../../models/decoded-signin-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /* Dependency Injection */
  /* Inject HttpClient service through function injection */
  private readonly httpClient = inject(HttpClient);
  /* Inject HttpClient service through function injection */
  private readonly cookieService = inject(CookieService);

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

  /*-----------------------------------------------------------------------------
  # Description: A function to sign out the user from the site by removing signin
  # token from cookies
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  logOut(): void {
    /* Delete signin token from the site */
    this.cookieService.delete('signinToken');
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to decode received sign in JWT after a successful 
  # sign in
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  decodeSigninToken(): DecodedSigninToken | undefined {
    /* Local variables definition */
    let decodedJWT: DecodedSigninToken | undefined = undefined;
    try {
      /* Decode sigin JWT saved in cookies (If Any) */
      decodedJWT = jwtDecode(this.cookieService.get('signinToken'));
    } catch (error) {
      /* Sign the user out from the site */
      this.logOut();
      /* Print the error on console */
      console.log('%c Error: ', 'color:red', error);
    }
    return decodedJWT;
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the status after 
  # an email is sent to the backend to verify if it's registered in the system or 
  # not through Route E-Commerce API on '/auth/forgotPasswords' endpoint to proceed 
  # in forget password proccess and recover the account
  #------------------------------------------------------------------------------
  # @params: forgotPasswordBody:Object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  forgotPassword(forgotPasswordBody: Object): Observable<any> {
    return this.httpClient.post(
      `${environment.ecommerceBaseURl}/auth/forgotPasswords`,
      forgotPasswordBody
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the status after 
  # a reset code is sent to the backend through Route E-Commerce API on '/auth/
  # verifyResetCode' endpoint to proceed in forget password proccess, reset the
  # old password with new one and recover the account
  #------------------------------------------------------------------------------
  # @params: verifyResetCodeBody:Object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  verifyResetCode(verifyResetCodeBody: Object): Observable<any> {
    return this.httpClient.post(
      `${environment.ecommerceBaseURl}/auth/verifyResetCode`,
      verifyResetCodeBody
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get an obeservable<any> that holds the authentication 
  # token after a new password is set and sent to the backend through Route E-Commerce 
  # API on '/auth/resetPassword' endpoint to recover the account
  #------------------------------------------------------------------------------
  # @params: resetPassword:Object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  resetPassword(resetPasswordBody: Object): Observable<any> {
    return this.httpClient.put(
      `${environment.ecommerceBaseURl}/auth/resetPassword`,
      resetPasswordBody
    );
  }
}
