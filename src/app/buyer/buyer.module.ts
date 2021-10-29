import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    BuyerComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule
  ]
})
export class BuyerModule { }
