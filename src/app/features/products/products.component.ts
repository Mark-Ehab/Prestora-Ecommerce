import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Subscription } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/Search/search-pipe';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Category } from '../../core/models/category.interface';
import { Brand } from '../../core/models/brand.interface';
import { CateogriesFilterPipe } from '../../shared/pipes/CategoriesFilter/cateogries-filter-pipe';
import { BrandsFilterPipe } from '../../shared/pipes/BrandsFilter/brands-filter-pipe';
import { BrandsService } from '../../core/services/brands/brands.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent,
    RouterLink,
    NgxPaginationModule,
    FormsModule,
    SearchPipe,
    CateogriesFilterPipe,
    BrandsFilterPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit {
  /* Dependency Injection */
  /* Inject ProductsService through function injection */
  private readonly productsService = inject(ProductsService);
  /* Inject WishlistService service through function injection */
  private readonly wishlistService = inject(WishlistService);
  /* Inject BrandsService service through function injection */
  private readonly brandsService = inject(BrandsService);
  /* Inject CategoriesService service through function injection */
  private readonly categoriesService = inject(CategoriesService);
  /* Inject FlowbiteService service through function injection */
  private readonly flowbiteService = inject(FlowbiteService);
  /* Inject ActivatedRoute service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);
  /* Inject Renderer2 service through function injection */
  private readonly renderer = inject(Renderer2);
  /* Inject ElementRef through function injection */
  private readonly el = inject(ElementRef);

  /* Properties */
  private allProductsSubscription: Subscription = new Subscription();
  allProducts: Product[] = [] as Product[];
  allCategories: Category[] = [] as Category[];
  allBrands: Brand[] = [] as Brand[];
  categories: Category = {} as Category;
  brands: Brand = {} as Brand;
  itemsPerPage!: number;
  currentPage!: number;
  totalItems!: number;
  searchKeyword: string = '';
  filteredCategories: Set<string> = new Set();
  filteredBrands: Set<string> = new Set();
  brandsMatch: Signal<boolean> = computed(() =>
    this.brandsService.brandsFilterMatch()
  );
  categoriesMatch: Signal<boolean> = computed(() =>
    this.categoriesService.CategoriesFilterMatch()
  );

  /* Constructor */
  constructor() {
    this.allProducts = this.shuffleList<Product>(
      this.activatedRoute.snapshot.data['productsList'].data
    );
    this.itemsPerPage =
      this.activatedRoute.snapshot.data['productsList'].metadata.limit;
    this.currentPage =
      this.activatedRoute.snapshot.data['productsList'].metadata.currentPage;
    this.totalItems = this.activatedRoute.snapshot.data['productsList'].results;
    this.allCategories =
      this.activatedRoute.snapshot.data['categoriesList'].data;
    this.allBrands = [
      ...this.activatedRoute.snapshot.data['allBrandsList'][0].data,
      ...this.activatedRoute.snapshot.data['allBrandsList'][1].data,
    ];
    this.wishlistService.wishlist.set(
      this.activatedRoute.snapshot.data['wishlistItemsData'].data
    );
  }

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
    /* Unsubscribe from allProductsSubscription subscription */
    this.allProductsSubscription.unsubscribe();
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

  /*-----------------------------------------------------------------------------
  # Description: A function update category filters on category checkbox change
  #------------------------------------------------------------------------------
  # @params: 
  # @param1: event:Event
  # @param2: categoryName: string
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  onCategoryCheckboxChange(event: Event, categoryName: string) {
    /* Local variables definition */
    const inputField: HTMLInputElement = event.target as HTMLInputElement;

    /* Check if category checkbox is checked */
    if (inputField.checked) {
      this.filteredCategories = new Set(this.filteredCategories).add(
        categoryName
      );
    } else {
      this.filteredCategories.delete(categoryName);
      this.filteredCategories = new Set(this.filteredCategories);
    }

    /* Check if selected categories are matched */
    if (!this.filteredCategories.size) {
      this.categoriesService.CategoriesFilterMatch.set(true);
    } else {
      if (
        this.allProducts.filter((product) =>
          this.filteredCategories.has(product.category.name)
        ).length
      ) {
        this.categoriesService.CategoriesFilterMatch.set(true);
      } else {
        this.categoriesService.CategoriesFilterMatch.set(false);
      }
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function update brand filters on brand checkbox change
  #------------------------------------------------------------------------------
  # @params: 
  # @param1: event:Event
  # @param2: brandName: string
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  onBrandCheckboxChange(event: Event, brandName: string) {
    /* Local variables definition */
    const inputField: HTMLInputElement = event.target as HTMLInputElement;

    /* Check if brand checkbox is checked */
    if (inputField.checked) {
      this.filteredBrands = new Set(this.filteredBrands).add(brandName);
    } else {
      this.filteredBrands.delete(brandName);
      this.filteredBrands = new Set(this.filteredBrands);
    }

    /* Check if selected brands are matched */
    if (!this.filteredBrands.size) {
      this.brandsService.brandsFilterMatch.set(true);
    } else {
      if (
        this.allProducts.filter((product) =>
          this.filteredBrands.has(product.brand.name)
        ).length
      ) {
        this.brandsService.brandsFilterMatch.set(true);
      } else {
        this.brandsService.brandsFilterMatch.set(false);
      }
    }
  }

  /* Component Lifecycle Hooks */
  ngOnInit() {
    /* Initialize and load Flowbite on component initialization */
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  ngAfterViewInit() {
    const footer = document.querySelector('footer');
    const sidebar = this.el.nativeElement.querySelector(
      'aside.large-screen-slider'
    );
    const productsLayout = this.el.nativeElement.querySelector(
      'div.products-layout'
    );
    console.log(footer);
    console.log(sidebar);
    console.log(productsLayout);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Footer visible → stop fixed
          this.renderer.removeClass(sidebar, 'fixed');
          this.renderer.removeClass(sidebar, 'z-40');
          this.renderer.addClass(sidebar, 'absolute');
          this.renderer.setStyle(sidebar, 'bottom', '0');
          this.renderer.removeClass(productsLayout, 'md:fixed');
          this.renderer.removeClass(productsLayout, 'md:z-40');
          this.renderer.addClass(productsLayout, 'md:absolute');
          this.renderer.setStyle(productsLayout, 'md:bottom', '0');
        } else {
          // Footer hidden → make it fixed again
          this.renderer.removeClass(sidebar, 'absolute');
          this.renderer.addClass(sidebar, 'fixed');
          this.renderer.addClass(sidebar, 'z-40');
          this.renderer.removeStyle(sidebar, 'bottom');
          this.renderer.removeClass(productsLayout, 'md:absolute');
          this.renderer.addClass(productsLayout, 'md:fixed');
          this.renderer.addClass(productsLayout, 'md:z-40');
          this.renderer.removeStyle(productsLayout, 'md:bottom');
        }
      },
      { threshold: 0.1 }
    );

    if (footer) observer.observe(footer);
  }
}
