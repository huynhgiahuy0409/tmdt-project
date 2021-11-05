import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BreadcrumbModule } from '../shared/layout/customer/breadcrumb';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog.detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot.password.component';
import {CartComponent} from "./components/cart/cart.component";
import {CustomerHeaderModule} from "../shared/layout/customer/header";
import {CustomerFooterModule} from "../shared/layout/customer/footer";

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
    CartComponent
  ],
  imports: [CommonModule, BuyerRoutingModule, BreadcrumbModule, CustomerHeaderModule, CustomerFooterModule],
})
export class BuyerModule {}
