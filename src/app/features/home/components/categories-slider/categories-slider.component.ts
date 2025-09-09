import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'categories-slider',
  imports: [CarouselModule, RouterLink],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss',
})
export class CategoriesSliderComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject CategoriesService through function injection */
  private readonly categoriesService = inject(CategoriesService);

  /* Properties */
  allCategories: Category[] = [] as Category[];
  private allCategoriesSubscription!: Subscription;
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

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get the data of All Categories got from Route 
  # E-Commerce API on '/categories' endpoint
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getAllCategoriesData(): void {
    this.allCategoriesSubscription = this.categoriesService
      .getAllCategories()
      .subscribe({
        next: (response) => {
          this.allCategories = response.data;
        },
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.message}`),
      });
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Get All Categories data on component initialiation */
    this.getAllCategoriesData();
  }

  ngOnDestroy(): void {
    /* Unsubscribe from All Categories observable on component destruction */
    this.allCategoriesSubscription.unsubscribe();
  }
}
