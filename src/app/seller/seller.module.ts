import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import {SellerPageComponent} from "./page/page.component";
import {SellerSidebarModule} from "../shared/layout/seller/sidebar/sidebar.module";
import {SellerHeaderModule} from "../shared/layout/seller/header/header.module";


@NgModule({
  declarations: [
    SellerComponent,SellerPageComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SellerSidebarModule,
    SellerHeaderModule,
  ]
})
export class SellerModule { }
