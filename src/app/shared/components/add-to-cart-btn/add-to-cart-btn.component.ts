import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../features/cart/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-to-cart-btn',
  imports: [],
  templateUrl: './add-to-cart-btn.component.html',
  styleUrl: './add-to-cart-btn.component.scss',
})
export class AddToCartBtnComponent {
  /* Dependency Injection */
  /* Inject CartService service through function injection */
  private readonly cartService = inject(CartService);
  /* Inject ToastrService service through function injection */
  private readonly toastrService = inject(ToastrService);

  /* Properties */
  private addProductToCartSubscription: Subscription = new Subscription();
  @Input({ required: true }) productId!: string;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function that adds a product to a logged user cart through  
  # posting product's id of product to be added to the backend using Route 
  # E-Commerce API on '/cart' endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @param 1: productId: string
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  addProductDataToCart(productId: string): void {
    this.addProductToCartSubscription.unsubscribe();
    this.addProductToCartSubscription = this.cartService
      .addProductToCart(productId)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            /* Set cart items count */
            this.cartService.cartItemsCount.set(response.numOfCartItems);
            /* Show a toastr message to inform the user the product is added to cart successfully */
            this.toastrService.success(response.message, 'Prestora');
          }
        },
        error: (err) =>
          console.log('%c Error: ', 'color:red', err.error.message),
      });
  }
}
