import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Product } from '../../core/models/product.interface';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject WishlistService service through function injection */
  private readonly wishlistService = inject(WishlistService);
  /* Inject ActivatedRoute service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);

  /* Properties */
  updatedWishlist: Signal<Product[] | null> = computed(() => {
    if (this.wishlistService.wishlist()?.length) {
      this.wishListIsUpdated = true;
    }
    if (this.wishListIsUpdated) {
      this.wishList = this.wishlistService.wishlist();
    }

    return this.wishlistService.wishlist();
  });
  wishList!: Product[] | null;
  wishListIsUpdated: boolean = false;
  private loggedUserWishlistSubscription: Subscription = new Subscription();

  /* constructor */
  constructor() {
    /* Get Wishlist data from resolver */
    this.wishList = this.activatedRoute.snapshot.data['wishlistItemsData'].data;
  }

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
    /* Unsubscribe from loggedUserWishlistSubscription on component destruction */
    this.loggedUserWishlistSubscription.unsubscribe();
    this.loggedUserWishlistSubscription = this.wishlistService
      .getLoggedUserWishlist()
      .subscribe({
        next: (response) => {
          this.wishList = response.data;
          // this.wishlistService.wishlist.set(false);
        },
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.message}`),
      });
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Get all products existing in wishlist */
    // this.getLoggedUserWishlist();
  }

  ngOnDestroy(): void {
    /* Unsubscribe from loggedUserWishlistSubscription on component destruction */
    // this.loggedUserWishlistSubscription.unsubscribe();
  }
}
