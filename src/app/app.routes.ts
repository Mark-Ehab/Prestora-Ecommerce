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
import { authGuard } from './core/guards/AuthGuard/auth-guard';
import { isLoggedInGuard } from './core/guards/isLoggedInGuard/is-logged-in-guard';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';
import { cartItemResolver } from './core/resolvers/CartItem/cart-item-resolver';
import { wishlistItemsResolver } from './core/resolvers/WishlistItems/wishlist-items-resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
        canActivate: [authGuard],
      },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Brands',
        canActivate: [authGuard],
      },
      {
        path: 'productdetails/:slug_name/:id',
        component: ProductDetailsComponent,
        title: 'Product Details',
        canActivate: [authGuard],
      },
      {
        path: 'productdetails/:id',
        component: ProductDetailsComponent,
        title: 'Product Details',
        canActivate: [authGuard],
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'Wishlist',
        canActivate: [authGuard],
        resolve: { wishlistItemsData: wishlistItemsResolver },
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
        canActivate: [authGuard],
        resolve: { cartData: cartItemResolver },
      },
      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        title: 'Checkout',
        canActivate: [authGuard],
      },
      {
        path: 'allorders',
        component: OrdersComponent,
        title: 'All Orders',
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [isLoggedInGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'signup', component: SignupComponent, title: 'Signup' },
      {
        path: 'forgetpassword',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: '404 - Page Not Found !',
  },
];
