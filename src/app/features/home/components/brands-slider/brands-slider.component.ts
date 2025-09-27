import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Brand } from '../../../../core/models/brand.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'brands-slider',
  imports: [CarouselModule, RouterLink],
  templateUrl: './brands-slider.component.html',
  styleUrl: './brands-slider.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BrandsSliderComponent {
  /* Dependency Injection */
  /* Inject ActivatedRoute Service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);

  /* Properties */
  allBrands!: Brand[];
  brandsSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 700,
    margin: 5,
    autoHeight: true,
    autoWidth: true,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      640: {
        items: 4,
      },
      768: {
        items: 5,
      },
      1024: {
        items: 6,
      },
      1280: {
        items: 7,
      },
    },
    nav: true,
  };

  /* Constructor */
  constructor() {
    this.allBrands = this.activatedRoute.snapshot.data['homeBrands'].data;
  }
}
