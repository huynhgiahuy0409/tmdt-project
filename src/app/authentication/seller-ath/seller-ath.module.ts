import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerAthRoutingModule } from './seller-ath-routing.module';
import { SellerAthComponent } from './seller-ath.component';


@NgModule({
  declarations: [
    SellerAthComponent
  ],
  imports: [
    CommonModule,
    SellerAthRoutingModule
  ]
})
export class SellerAthModule { }
