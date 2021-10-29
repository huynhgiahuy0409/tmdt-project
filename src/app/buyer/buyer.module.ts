import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BreadcrumbModule } from '../shared/layout/customer/breadcrumb';


@NgModule({
  declarations: [
    BuyerComponent,
    HomeComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    BreadcrumbModule
  ]
})
export class BuyerModule { }
