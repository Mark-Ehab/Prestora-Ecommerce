import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
export class ProductDetailsComponent {
  /* Dependency Injection */
  /* Inject ActivatedRoute Service through function injection*/
  private readonly activatedRoute = inject(ActivatedRoute);
  /* Inject WishlistService Service through function injection*/
  private readonly wishlistService = inject(WishlistService);

  /* Properties */
  productId!: string;
  productDetails: Product = { category: {}, brand: {} } as Product;
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

  /* Constructor */
  constructor() {
    this.productDetails =
      this.activatedRoute.snapshot.data['productDetailsItem'].data;
    this.defaultProductImage =
      this.activatedRoute.snapshot.data['productDetailsItem'].data.imageCover;
    this.productId =
      this.activatedRoute.snapshot.data['productDetailsItem'].data.id;
    this.wishlistService.wishlist.set(
      this.activatedRoute.snapshot.data['wishlistItemsData'].data
    );
  }
}
