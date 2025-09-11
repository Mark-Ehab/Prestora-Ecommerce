import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from './models/cart.interface';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject CartService service through function injection */
  private readonly cartService = inject(CartService);
  /* Inject ToastrService service through function injection */
  private readonly toastrService = inject(ToastrService);

  /* Properties */
  cartDetails: Cart = {} as Cart;
  private getCartSubscription!: Subscription;
  private clearCartSubscription: Subscription = new Subscription();
  private removeSpecificCartProductSubscription: Subscription =
    new Subscription();
  private updateSpecificCartProductQuantitySubscription: Subscription =
    new Subscription();

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get the data of a logged user cart got from Route 
  # E-Commerce API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getCartData(): void {
    this.getCartSubscription = this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
      error: (err) => console.log('%c Error: ', 'color:red', err.error.message),
    });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function that gets the response data of a logged user cart after 
  # a product is removed from it through deleting product's id from the backend 
  # using Route E-Commerce API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  # @param 1: removedProductId: string
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  removeSpecificCartProductData(removedProductId: string): void {
    this.removeSpecificCartProductSubscription.unsubscribe();
    this.removeSpecificCartProductSubscription = this.cartService
      .removeSpecificCartProduct(removedProductId)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.cartDetails = response.data;
            this.toastrService.success(
              'Product is successfully removed from your cart',
              'Prestora'
            );
          }
        },
        error: (err) =>
          console.log('%c Error: ', 'color:red', err.error.message),
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function that gets an obeservable<any> that holds the response  
  # data of a logged user cart after a product quantity on it is updated through  
  # passing product's id and updated count to the backend using Route E-Commerce 
  # API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  # @param 1: updatedProductId: string
  # @param 2: productQuantity: string
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  updateSpecificCartProductQuantityData(
    updatedProductId: string,
    productQuantity: number
  ): void {
    this.updateSpecificCartProductQuantitySubscription.unsubscribe();
    this.updateSpecificCartProductQuantitySubscription = this.cartService
      .updateSpecificCartProductQuantity(updatedProductId, productQuantity)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.cartDetails = response.data;
            if (!productQuantity) {
              this.toastrService.success(
                'Product is successfully removed from your cart',
                'Prestora'
              );
            }
          }
        },
        error: (err) =>
          console.log('%c Error: ', 'color:red', err.error.message),
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function that gets the response data of a logged user cart after 
  # a product is removed from it through deleting product's id from the backend 
  # using Route E-Commerce API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  # @param 1: removedProductId: string
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  clearCartData(): void {
    this.clearCartSubscription.unsubscribe();
    this.clearCartSubscription = this.cartService.clearCart().subscribe({
      next: (response) => {
        console.log(response);
        this.getCartData();
      },
      error: (err) => console.log('%c Error: ', 'color:red', err.error.message),
    });
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Get cart data on Cart component initialization */
    this.getCartData();
  }
  ngOnDestroy(): void {
    /* Unsubscribe from Get Cart observable on component destruction */
    this.getCartSubscription.unsubscribe();
  }
}
