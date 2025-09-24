import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Product } from '../../core/models/product.interface';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  /* Dependency Injection */
  /* Inject WishlistService service through function injection */
  private readonly wishlistService = inject(WishlistService);
  /* Inject ActivatedRoute service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);

  /* Properties */
  updatedWishlist: Signal<Product[] | null> = computed(() => {
    return this.wishlistService.wishlist();
  });

  /* constructor */
  constructor() {
    /* Get Wishlist data from resolver */
    this.wishlistService.wishlist.set(
      this.activatedRoute.snapshot.data['wishlistItemsData'].data
    );
  }
}
