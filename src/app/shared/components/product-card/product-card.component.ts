import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../pipes/Term/term-pipe';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';

@Component({
  selector: 'product-card',
  imports: [RouterLink, CurrencyPipe, TermPipe, AddToCartBtnComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  /* Properties */
  @Input({ required: true }) id!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) slug!: string;
  @Input({ required: true }) imgSrc: string =
    '/images/default-loading-image.png';
  @Input({ required: true }) brandImgSrc!: string;
  @Input({ required: true }) brandName!: string;
  @Input({ required: true }) quantity!: number;
  @Input({ required: true }) rate!: number;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) priceAfterDiscount!: number;
  isAddToFavBtnClicked: boolean = false;
  isAddToFavBtnHovered: boolean = false;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to toggle fav button icon color on click
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  toggleFavBtnOnClick(): void {
    this.isAddToFavBtnClicked = !this.isAddToFavBtnClicked;
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to fill fav button icon with main color on mouse enter
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  fillFavBtnOnMouseEnter(): void {
    this.isAddToFavBtnHovered = true;
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to empty fav button icon color on mouse leave
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  emptyFavBtnOnMouseLeave(): void {
    this.isAddToFavBtnHovered = false;
  }
}
