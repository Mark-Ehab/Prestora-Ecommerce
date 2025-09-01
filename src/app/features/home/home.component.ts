import { Component } from '@angular/core';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { CategoriesSliderComponent } from './components/categories-slider/categories-slider.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';
import { BrandsSliderComponent } from './components/brands-slider/brands-slider.component';

@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    CategoriesSliderComponent,
    PopularProductsComponent,
    BrandsSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
