import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../pipes/Term/term-pipe';
import { AddToCartBtnComponent } from '../add-to-cart-btn/add-to-cart-btn.component';
import { WishlistBtnComponent } from '../wishlist-btn/wishlist-btn.component';
import { Product } from '../../../core/models/product.interface';

@Component({
  selector: 'product-card',
  imports: [
    RouterLink,
    CurrencyPipe,
    TermPipe,
    AddToCartBtnComponent,
    WishlistBtnComponent,
  ],
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
  @Input({ required: true }) wishlist!: Product[] | null;
}
