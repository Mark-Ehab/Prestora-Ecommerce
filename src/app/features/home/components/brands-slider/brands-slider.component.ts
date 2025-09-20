import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../../../core/services/brands/brands.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Brand } from '../../../../core/models/brand.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'brands-slider',
  imports: [CarouselModule, RouterLink],
  templateUrl: './brands-slider.component.html',
  styleUrl: './brands-slider.component.scss',
})
export class BrandsSliderComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject BrandsService through function injection */
  private readonly brandsService = inject(BrandsService);

  /* Properties */
  allBrands: Brand[] = [] as Brand[];
  private allBrandsSubscription!: Subscription;
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

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get the data of All Brands got from Route 
  # E-Commerce API on '/brands' endpoint
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getAllBrandsData(): void {
    this.allBrandsSubscription = this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        this.allBrands = response.data;
      },
      error: (err) => console.log('%c Error:', 'color:red', ` ${err.message}`),
    });
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Get All Brands data on component initialiation */
    this.getAllBrandsData();
  }

  ngOnDestroy(): void {
    /* Unsubscribe from allBrandsSubscription observable subscription on component destruction */
    this.allBrandsSubscription.unsubscribe();
  }
}
