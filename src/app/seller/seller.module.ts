import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import {SellerPageComponent} from "./page/page.component";
import { AdminModule } from '../admin/admin.module';
import { AdminHeaderModule } from '../shared/layout/admin/header/header.module';
import { AdminSidebarModule } from '../shared/layout/admin/sidebar/sidebar.module';


@NgModule({
  declarations: [
    SellerComponent,SellerPageComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    AdminHeaderModule,
    AdminSidebarModule
  ]
})
export class SellerModule { }
