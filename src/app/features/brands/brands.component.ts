import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Subscription } from 'rxjs';
import { Brand } from '../../core/models/brand.interface';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit, OnDestroy {
  /* Dependency Injection */
  /* Inject BrandsService service through function injection */
  private readonly brandsService = inject(BrandsService);

  /* Properties */
  allBrands: Brand[] = [] as Brand[];
  private allBrandsSubscription!: Subscription;

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
