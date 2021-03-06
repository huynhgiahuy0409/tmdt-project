import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent, ConfirmOrderDialog, ShippingDialog } from './components/checkout/checkout.component';
import { BreadcrumbModule } from '../shared/layout/customer/breadcrumb';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog.detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot.password.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerHeaderModule } from '../shared/layout/customer/header';
import { CustomerFooterModule } from '../shared/layout/customer/footer';
import { MaterialModules } from '../material.module';
import { ShopComponent } from './components/shop/shop.componet';
import { ProductModule } from './components/product/product.module';
import { AuthModule } from '../shared/layout/common/auth/auth.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetComponent } from './components/reset/reset.component';
import { FindingShopComponent } from './components/finding-shop/finding-shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

import { PostService } from './post.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogComponent } from './components/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { ProductFilterChainService } from './services/product-filter-chain.service';
import { RouterStateSnapshot } from '@angular/router';
import { ShopService } from '../seller/services/shop.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig} from 'angularx-social-login';
import { QRCodeModule } from 'angularx-qrcode';
import { PaymentComponent } from './payment/payment.component';
import { OrderDetailDialog } from './components/account-management/purchase-history/purchase-history.component';

@NgModule({
  declarations: [
    BuyerComponent,
    HomeComponent,
    CheckoutComponent,
    ContactComponent,
    AboutUsComponent,
    BlogComponent,
    BlogDetailComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CartComponent,
    ShopComponent,
    SignUpComponent,
    ResetComponent,
    FindingShopComponent,
    DialogComponent,
    ShippingDialog,
    ConfirmOrderDialog,
    OrderDetailDialog,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    BreadcrumbModule,
    CustomerHeaderModule,
    CustomerFooterModule,
    ReactiveFormsModule,
    ProductModule,
    AuthModule,
    FormsModule,
    MaterialModules,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    QRCodeModule
  ],
  providers: [
    PostService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    CookieService,
    ProductFilterChainService,
    ShopService,
  ],

})
export class BuyerModule {}
