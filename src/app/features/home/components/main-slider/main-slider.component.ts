import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainSliderComponent {
  /* Properties */
  mainSliderOptions: OwlOptions = {
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
}
