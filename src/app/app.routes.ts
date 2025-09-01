import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { HomeComponent } from './features/home/home.component';
import { BrandsComponent } from './features/brands/brands.component';
import { ProductsComponent } from './features/products/products.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { OrdersComponent } from './features/orders/orders.component';
import { CartComponent } from './features/cart/cart.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { BlankComponent } from './core/layouts/blank/blank.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'signup', component: SignupComponent, title: 'Signup' },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      {
        path: 'productdetails/:slug_name/:id',
        component: ProductDetailsComponent,
        title: 'Product Details',
      },
      {
        path: 'productdetails/:id',
        component: ProductDetailsComponent,
        title: 'Product Details',
      },
      { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'orders', component: OrdersComponent, title: 'Orders' },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: '404 - Page Not Found',
  },
];
