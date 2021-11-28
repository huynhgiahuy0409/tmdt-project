import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import {SellerPageComponent} from "./page/page.component";
import { AdminModule } from '../admin/admin.module';
import { AdminHeaderModule } from '../shared/layout/admin/header/header.module';
import { AdminSidebarModule } from '../shared/layout/admin/sidebar/sidebar.module';
import { BarchartComponent } from './components/barchart/barchart.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { ShopInforComponent } from './components/shop-infor/shop-infor.component';
import {MaterialModules} from "../material.module";

@NgModule({
  declarations: [
    SellerComponent,SellerPageComponent, BarchartComponent, PiechartComponent, ShopInforComponent
  ],
    imports: [
        CommonModule,
        SellerRoutingModule,
        AdminHeaderModule,
        AdminSidebarModule,
        MaterialModules
    ]
})
export class SellerModule { }
