import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyerComponent } from './buyer.component';
import { BlogComponent, BlogDetailComponent } from './components/blog';
import { CheckoutComponent } from './components/checkout';
import { AboutUsComponent } from './components/aboutUs';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.componet';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetComponent } from './components/reset/reset.component';

import { AuthGuardService } from '../shared/layout/common/auth/auth-guard.component';
import { FindingShopComponent } from './components/finding-shop/finding-shop.component';
import { CategoryResolve } from '../shared/services/resolve.ts/category.resolve';
import { BrandResolve } from '../shared/services/resolve.ts/brand.resolve';
import { ProductResolve } from '../shared/services/resolve.ts/product.resolve';
import { RecommendAgeResolve } from '../shared/services/resolve.ts/recommend-age.resolve';
import { AuthGuard } from '../_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BuyerComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'reset', component: ResetComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: RegisterComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/:id', component: BlogDetailComponent },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuardService],
      },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'payment', component: ShopComponent },
      { path: 'shop', component: ShopComponent },
      {
        path: 'shop',
        component: ShopComponent,
      },
      { path: 'finding-shop', component: FindingShopComponent },
      {
        path: 'product',
        loadChildren: () =>
          import('./components/product/product.module').then(
            (m) => m.ProductModule
          ),
        resolve: {
          categories: CategoryResolve,
          brands: BrandResolve,
          allProduct: ProductResolve,
          recommendAges: RecommendAgeResolve,
        },
      },
      {
        path: 'account-management',
        loadChildren: () =>
          import(
            './components/account-management/account-management.module'
          ).then((m) => m.AccountManagementModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CategoryResolve,
    BrandResolve,
    ProductResolve,
    RecommendAgeResolve,
  ],
})
export class BuyerRoutingModule {}
