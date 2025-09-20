import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject CategoriesService through function injection */
  private readonly categoriesService = inject(CategoriesService);

  /* Properties */
  allCategories: Category[] = [] as Category[];
  private allCategoriesSubscription!: Subscription;

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
    /* Unsubscribe from allCategoriesSubscription observable subscription on component destruction */
    this.allCategoriesSubscription.unsubscribe();
  }
}
