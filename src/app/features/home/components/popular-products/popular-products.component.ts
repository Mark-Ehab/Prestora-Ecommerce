import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OnSalePipe } from '../../../../shared/pipes/OnSale/on-sale-pipe';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'popular-products',
  imports: [ProductCardComponent, RouterLink, OnSalePipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent implements OnInit {
  /* Dependency Injection */
  /* Inject WishlistService service through function injection */
  private readonly wishlistService = inject(WishlistService);
  /* Inject ActivatedRoute service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);

  /* Properties */
  allProducts: Product[] = [] as Product[];
  wishlist: Product[] = [] as Product[];

  /* Methods */
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
    // this.wishlistService.wishlist.set(
    //   this.activatedRoute.snapshot.data['homeWishlist'].data
    // );
    // this.allProducts = this.shuffleList<Product>(
    //   this.activatedRoute.snapshot.data['homeProducts'].data
    // );
  }

  /* Constructor */
  constructor() {
    this.wishlistService.wishlist.set(
      this.activatedRoute.snapshot.data['homeWishlist'].data
    );
    this.allProducts = this.shuffleList<Product>(
      this.activatedRoute.snapshot.data['homeProducts'].data
    );
  }
}
