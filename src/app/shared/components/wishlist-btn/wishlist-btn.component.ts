import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product.interface';

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

  /* Properties */
  @Input({ required: true }) productId!: string;
  @Input({ required: true }) wishlist!: Product[];
  updatedWishlist!: Product[];
  isProductAddedToWishlist: boolean = false;
  isAddToWishlistBtnHovered: boolean = false;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get all the data of a logged user wishlist got from
  # Route E-Commerce API on '/wishlist' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getLoggedUserWishlist(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (response) => {
        this.updatedWishlist = response.data;
        /* Set updated wishlist */
        this.wishlistService.wishlist.set(this.updatedWishlist);
      },
      error: (err) => console.log('%c Error:', 'color:red', ` ${err.message}`),
    });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to toggle the state of fav button icon on click to 
  # either add or remove a specific icon to wishlist
  #------------------------------------------------------------------------------
  # @params: productId:string | null
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  toggleWishlistBtnOnClick(productId: string | null): void {
    /* Check if product is in wishlist or not */
    if (!this.isProductAddedToWishlist) {
      /* Add the product to wishlist */
      this.wishlistService.addProductToWishlist(productId as string).subscribe({
        next: (response) => {
          /* Check if product is added to wishlist successfully */
          if (response.status === 'success') {
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
              /* Show to the user that product is removed successfully from wishlist */
              this.toastrService.info(
                `${response.message.replace('to', 'from')}`,
                'Prestora'
              );
            }
            /* Get wishlist */
            this.getLoggedUserWishlist();
          },
          error: (err) => console.log('%c Error: ', 'color:red', err.message),
        });
    }
    /* Toggle state of fav button */
    this.isProductAddedToWishlist = !this.isProductAddedToWishlist;
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
    if (this.wishlist.find((product) => product.id === productId)) {
      this.isProductAddedToWishlist = true;
    }
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
    /* Check if product on which this btn exists is present in wishlist on component initialization */
    this.checkProductWishlistPresense(this.productId as string);
  }
}
