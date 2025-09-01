import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [RouterLink],
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
  toggleFavBtnOnClick(): void {
    this.isAddToFavBtnClicked = !this.isAddToFavBtnClicked;
  }
  fillFavBtnOnMouseEnter(): void {
    this.isAddToFavBtnHovered = true;
  }
  emptyFavBtnOnMouseLeave(): void {
    this.isAddToFavBtnHovered = false;
  }
}
