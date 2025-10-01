import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brand } from '../../core/models/brand.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BrandsComponent {
  /* Dependency Injection */
  /* Inject BrandsService service through function injection */
  private readonly brandsService = inject(BrandsService);
  /* Inject ActivatedRoute service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);

  /* Properties */
  allBrands: Brand[] = this.activatedRoute.snapshot.data['brandsList'].data;
  allBrandsSubscription: Subscription = new Subscription();
  itemsPerPage!: number;
  currentPage!: number;
  totalItems!: number;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get the data of All Brands got from Route 
  # E-Commerce API on '/brands' endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @param 1: pageNumber : number (Default = 1)
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getAllBrandsData(pageNumber: number = 1): void {
    /* Unsubscribe from allProductsSubscription subscription */
    this.allBrandsSubscription.unsubscribe();
    this.allBrandsSubscription = this.brandsService
      .getAllBrands(pageNumber)
      .subscribe({
        next: (response) => {
          this.allBrands = response.data;
          this.itemsPerPage = response.metadata.limit;
          this.currentPage = response.metadata.currentPage;
          this.totalItems = response.results;
        },
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.message}`),
      });
  }
}
