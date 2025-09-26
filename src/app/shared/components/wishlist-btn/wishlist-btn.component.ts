import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'wishlist-btn',
  imports: [],
  templateUrl: './wishlist-btn.component.html',
  styleUrl: './wishlist-btn.component.scss',
})
export class WishlistBtnComponent implements OnInit {
  /* Dependency Injection */
  /* Inject WishlistService service through function injection */
  private readonly wishlistService = inject(WishlistService);
  /* Inject ToastrService service through function injection */
  private readonly toastrService = inject(ToastrService);
  /* Inject CookieService service through function injection */
  private readonly cookieService = inject(CookieService);

  /* Properties */
  @Input({ required: true }) productId!: string;
  updatedWishlist!: Product[];
  isProductAddedToWishlist: boolean = false;
  isAddToWishlistBtnHovered: boolean = false;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to toggle the state of fav button icon on click to 
  # either add or remove a specific icon to wishlist
  #------------------------------------------------------------------------------
  # @params: productId:string | null
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  toggleWishlistBtnOnClick(productId: string | null): void {
    /* Check if the user is logged in */
    if (this.cookieService.check('signinToken')) {
      /* Check if product is in wishlist or not */
      if (!this.isProductAddedToWishlist) {
        /* Add the product to wishlist */
        this.wishlistService
          .addProductToWishlist(productId as string)
          .subscribe({
            next: (response) => {
              /* Check if product is added to wishlist successfully */
              if (response.status === 'success') {
                /* Set wishlist items count */
                this.wishlistService.wishlistItemsCount.set(
                  response.data.length
                );
                /* Show to the user that product is added successfully to wishlist */
                this.toastrService.success(`${response.message}`, 'Prestora');
              }
            },
            error: (err) => console.log('%c Error: ', 'color:red', err.message),
          });
      } else {
        /* Remove the product from wishlist */
        this.wishlistService
          .removeProductFromWishlist(productId as string)
          .subscribe({
            next: (response) => {
              /* Check if product is removed from wishlist successfully */
              if (response.status === 'success') {
                /* Set wishlist items count */
                this.wishlistService.wishlistItemsCount.set(
                  response.data.length
                );
                /* Show to the user that product is removed successfully from wishlist */
                this.toastrService.info(
                  `${response.message.replace('to', 'from')}`,
                  'Prestora'
                );
              }
              /* Remove this product from current wishlist */
              this.removeProductFromWishlist(productId as string);
            },
            error: (err) => console.log('%c Error: ', 'color:red', err.message),
          });
      }
      /* Toggle state of fav button */
      this.isProductAddedToWishlist = !this.isProductAddedToWishlist;
    } else {
      /* Notify the user to login */
      this.toastrService.info(
        'Please login first to add this product to your wishlist',
        'Prestora'
      );
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to check if the product is already existing on the 
  # wishlist 
  #------------------------------------------------------------------------------
  # @params: productId:string | null
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  checkProductWishlistPresense(productId: string) {
    /* Check if product is is existing on wishlist */
    if (
      this.wishlistService
        .wishlist()
        ?.find((product) => product.id === productId)
    ) {
      this.isProductAddedToWishlist = true;
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to remove product from wishlist array after being
  # removed from DB
  #------------------------------------------------------------------------------
  # @params: productId: string
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  removeProductFromWishlist(productId: string) {
    this.wishlistService.wishlist()?.splice(
      this.wishlistService.wishlist()?.findIndex((product) => {
        return product.id === this.productId;
      }) as number,
      1
    );
  }

  /* Event Handlers */
  /*-----------------------------------------------------------------------------
  # Description: A function to fill fav button icon with main color on mouse enter
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  @HostListener('mouseenter')
  fillFavBtnOnMouseEnter(): void {
    this.isAddToWishlistBtnHovered = true;
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to empty fav button icon color on mouse leave
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  @HostListener('mouseleave')
  emptyFavBtnOnMouseLeave(): void {
    this.isAddToWishlistBtnHovered = false;
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Check if the user is logged in */
    if (this.cookieService.check('signinToken')) {
      /* Check if product on which this btn exists is present in wishlist on component initialization */
      this.checkProductWishlistPresense(this.productId as string);
    }
  }
}
