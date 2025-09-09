import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../core/auth/services/Authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { DecodedSigninToken } from '../../../core/models/decoded-signin-token.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  /* Dependency Injection */
  /* Inject AuthenticationService service through function injection */
  private readonly cookieService = inject(CookieService);
  /* Inject AuthenticationService service through function injection */
  private readonly authenticationService = inject(AuthenticationService);
  /* Inject AuthenticationService service through function injection */
  private readonly router = inject(Router);
  /* Inject FlowbiteService service through constructor injection */
  constructor(private flowbiteService: FlowbiteService) {}

  /* Properties */
  isLoggedIn: boolean = false;
  signinDecodedToken: DecodedSigninToken | undefined = {} as DecodedSigninToken;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to sign out the user from the site 
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  signOut(): void {
    this.authenticationService.logOut();
    /* Toggle isLoggedIn flag*/
    this.isLoggedIn = !this.isLoggedIn;
    /* Navigate to home */
    this.router.navigate(['/home']);
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Initialize and load Flowbite on component initialization */
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    /* Check if user is logged in */
    if (this.cookieService.get('signinToken')) {
      /* Toggle isLoggedIn flag*/
      this.isLoggedIn = !this.isLoggedIn;
      /* Decode signin token */
      this.signinDecodedToken = this.authenticationService.decodeSigninToken();
    }
  }
}
