import { ProductDetailsService } from './services/ProductDetails/product-details.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { AddToCartBtnComponent } from '../../shared/components/add-to-cart-btn/add-to-cart-btn.component';
import { WishlistBtnComponent } from '../../shared/components/wishlist-btn/wishlist-btn.component';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [
    RouterLink,
    CarouselModule,
    CurrencyPipe,
    AddToCartBtnComponent,
    WishlistBtnComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject ActivatedRoute Service through function injection*/
  private readonly activatedRoute = inject(ActivatedRoute);
  /* Inject ProductDetailsService Service through function injection */
  private readonly productDetailsService = inject(ProductDetailsService);
  /* Inject WishlistService Service through function injection */
  private readonly wishlistService = inject(WishlistService);

  /* Properties */
  private paramMapSubscription!: Subscription;
  private productDetailsSubscription!: Subscription;
  private loggedUserWishlistSubscription!: Subscription;
  productId!: string;
  productDetails: Product = { category: {}, brand: {} } as Product;
  wishlist: Product[] = [] as Product[];
  defaultProductImage!: string;
  selectedProductColor: string = 'Blue';
  selectedProductSize: string = 'Medium';
  productSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    dots: true,
    navSpeed: 700,
    autoHeight: true,
    autoWidth: true,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get product id passed as path parameter from URL
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getProductIdFromUrl(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.productId = urlParams.get('id') as string;
        /* Get specfic product details data on component initialization */
        this.getSpecificProductDetailsData();
      },
    });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get the details data of a specfic product got from  
  # Route E-Commerce API on '/products' endpoint
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getSpecificProductDetailsData(): void {
    this.productDetailsSubscription = this.productDetailsService
      .getSpecficProductDetails(this.productId)
      .subscribe({
        next: (response) => {
          this.productDetails = response.data;
          this.defaultProductImage = response.data.imageCover;
        },
        error: (err) => {
          console.log('%c Error:', 'color:red', `${err.message}`);
        },
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
          /* Get product Id from URL on component initialization */
          this.getProductIdFromUrl();
        },
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.message}`),
      });
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Get logged user wishlist on component initialization */
    this.getLoggedUserWishlist();
  }

  ngOnDestroy(): void {
    /* Unsubscribe from paramMapSubscription observable on component destruction */
    this.paramMapSubscription.unsubscribe();
    /* Unsubscribe from productDetailsSubscription observable on component destruction */
    this.productDetailsSubscription.unsubscribe();
    /* Unsubscribe from loggedUserWishlistSubscription observable on component destruction */
    this.loggedUserWishlistSubscription.unsubscribe();
  }
}
