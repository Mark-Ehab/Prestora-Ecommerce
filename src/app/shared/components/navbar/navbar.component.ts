import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../core/services/Authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { DecodedSigninToken } from '../../../core/models/decoded-signin-token.interface';
import { CartService } from '../../../features/cart/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

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
  /* Inject CartService service through function injection */
  private readonly cartService = inject(CartService);
  /* Inject WishlistService service through function injection */
  private readonly wishlistService = inject(WishlistService);
  /* Inject FlowbiteService service through constructor injection */
  constructor(private flowbiteService: FlowbiteService) {}

  /* Properties */
  isLoggedIn: boolean = false;
  signinDecodedToken: DecodedSigninToken | undefined = {} as DecodedSigninToken;
  cartProductsCount: Signal<Number> = computed(() =>
    this.cartService.cartItemsCount()
  );
  wishlistProductsCount: Signal<Number> = computed(() =>
    this.wishlistService.wishlistItemsCount()
  );

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

  /*-----------------------------------------------------------------------------
  # Description: A function to get the number of products in cart 
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getCartProductsNumber(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.cartService.cartItemsCount.set(response.numOfCartItems);
        }
      },
      error: (err) => console.log('%c Error:', 'color:red', ` ${err.message}`),
    });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get the number of products in wishlist  
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getWislistProductsNumber(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (response) => {
        {
          if (response.status === 'success') {
            this.wishlistService.wishlistItemsCount.set(response.data.length);
          }
        }
      },
      error: (err) => console.log('%c Error:', 'color:red', ` ${err.message}`),
    });
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
      /* Get number of products in cart */
      this.getCartProductsNumber();
      /* Get number of products in wishlist */
      this.getWislistProductsNumber();
    }
  }
}
