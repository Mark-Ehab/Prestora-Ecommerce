import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Subscription } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/Search/search-pipe';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent,
    RouterLink,
    NgxPaginationModule,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject ProductsService through function injection */
  private readonly productsService = inject(ProductsService);
  /* Inject WishlistService service through function injection */
  private readonly wishlistService = inject(WishlistService);

  /* Properties */
  allProducts: Product[] = [] as Product[];
  wishlist: Product[] = [] as Product[];
  private allProductsSubscription!: Subscription;
  private loggedUserWishlistSubscription!: Subscription;
  itemsPerPage!: number;
  currentPage!: number;
  totalItems!: number;
  searchKeyword: string = '';

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
  # Description: A function to get all the data of a logged user wishlist got from
  # Route E-Commerce API on '/wishlist' endpoint
  #------------------------------------------------------------------------------
  # @params: void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getLoggedUserWishlist(): void {
    this.loggedUserWishlistSubscription = this.wishlistService
      .getLoggedUserWishlist()
      .subscribe({
        next: (response) => {
          this.wishlist = response.data;
          this.getAllProductsData();
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
    /* Get All Products existing on wishlist on component initialiation */
    this.getLoggedUserWishlist();
  }

  ngOnDestroy(): void {
    /* Unsubscribe from allProductsSubscription on component destruction */
    this.allProductsSubscription.unsubscribe();
    /* Unsubscribe from loggedUserWishlistSubscription on component destruction */
    this.loggedUserWishlistSubscription.unsubscribe();
  }
}
