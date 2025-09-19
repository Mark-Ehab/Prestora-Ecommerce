import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { OnSalePipe } from '../../../../shared/pipes/OnSale/on-sale-pipe';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'popular-products',
  imports: [ProductCardComponent, RouterLink, OnSalePipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject ProductsService through function injection */
  private readonly productsService = inject(ProductsService);
  /* Inject WishlistService service through function injection */
  private readonly wishlistService = inject(WishlistService);
  /* Inject CookieService service through function injection */
  private readonly cookieService = inject(CookieService);

  /* Properties */
  allProducts: Product[] = [] as Product[];
  wishlist: Product[] = [] as Product[];
  private allProductsSubscription!: Subscription;
  private loggedUserWishlistSubscription!: Subscription;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get the data of All Products got from Route 
  # E-Commerce API on '/products' endpoint
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getAllProductsData(): void {
    this.allProductsSubscription = this.productsService
      .getAllProducts()
      .subscribe({
        next: (response) =>
          (this.allProducts = this.shuffleList<Product>(response.data)),
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.message}`),
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get all the data of a logged user wishlist got from
  # Route E-Commerce API on '/wishlist' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getLoggedUserWishlist(): void {
    this.loggedUserWishlistSubscription = this.wishlistService
      .getLoggedUserWishlist()
      .subscribe({
        next: (response) => {
          this.wishlist = response.data;
          this.getAllProductsData();
        },
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.message}`),
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to shuffle the elments of an array (list) of any type
  #------------------------------------------------------------------------------
  # @params: list: T[]
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  shuffleList<T>(list: T[]): T[] {
    /* Local Scope Variables */
    let randomSwappedIndex!: number;
    let temp!: T;
    for (let counter = list.length - 1; counter > 0; counter--) {
      randomSwappedIndex = Math.floor(Math.random() * (counter - 1));
      temp = list[randomSwappedIndex];
      list[randomSwappedIndex] = list[counter];
      list[counter] = temp;
    }
    return list;
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Check if user is already logged in */
    if (this.cookieService.check('signinToken')) {
      /* Get all products existing on wishlist on component initialiation */
      this.getLoggedUserWishlist();
    } else {
      /* Get all products */
      this.getAllProductsData();
    }
  }

  ngOnDestroy(): void {
    /* Check if user is already logged in */
    if (this.cookieService.check('signinToken')) {
      /* Unsubscribe from loggedUserWishlistSubscription on component destruction */
      this.loggedUserWishlistSubscription.unsubscribe();
    } else {
      /* Unsubscribe from allProductsSubscription on component destruction */
      this.allProductsSubscription.unsubscribe();
    }
  }
}
