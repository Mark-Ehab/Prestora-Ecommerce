import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Subscription } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, RouterLink, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject ProductsService through function injection */
  private readonly productsService = inject(ProductsService);

  /* Properties */
  allProducts: Product[] = [] as Product[];
  private allProductsSubscription!: Subscription;
  itemsPerPage!: number;
  currentPage!: number;
  totalItems!: number;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get the data of All Products got from Route 
  # E-Commerce API on '/products' endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @param 1: pageNumber : number (Default = 1)
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getAllProductsData(pageNumber: number = 1): void {
    this.allProductsSubscription = this.productsService
      .getAllProducts(pageNumber)
      .subscribe({
        next: (response) => {
          this.allProducts = this.shuffleList<Product>(response.data);
          this.itemsPerPage = response.metadata.limit;
          this.currentPage = response.metadata.currentPage;
          this.totalItems = response.results;
        },
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.message}`),
      });
  }
  /*-----------------------------------------------------------------------------
  # Description: A function to shuffle the elments of an array (list) of any type
  #------------------------------------------------------------------------------
  # @params: list: T[]
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  shuffleList<T>(list: T[]): T[] {
    /* Local Scope Variables */
    let randomSwappedIndex!: number;
    let temp!: T;
    for (let counter = list.length - 1; counter > 0; counter--) {
      randomSwappedIndex = Math.floor(Math.random() * (counter - 1));
      temp = list[randomSwappedIndex];
      list[randomSwappedIndex] = list[counter];
      list[counter] = temp;
    }
    return list;
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Get All Products data on component initialiation */
    this.getAllProductsData();
  }

  ngOnDestroy(): void {
    /* Unsubscribe from All Products observable on component destruction */
    this.allProductsSubscription.unsubscribe();
  }
}
