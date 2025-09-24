import { Component, inject } from '@angular/core';
import { Category } from '../../../../core/models/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'categories-slider',
  imports: [CarouselModule, RouterLink],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss',
})
export class CategoriesSliderComponent {
  /* Dependency Injection */
  /* Inject activatedRoute Service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);

  /* Properties */
  allCategories!: Category[];
  categoriesSliderOptions: OwlOptions = {
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
    this.allCategories =
      this.activatedRoute.snapshot.data['homeCategories'].data;
  }
}
