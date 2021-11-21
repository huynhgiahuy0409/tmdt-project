import { PostService } from './../buyer/post.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerPageComponent } from './component/page/page.component';
import { AdminHeaderModule } from '../shared/layout/admin/header/header.module';
import { AdminSidebarModule } from '../shared/layout/admin/sidebar/sidebar.module';

import { ProductManagementModule } from './component/product-management/product-management.module';
import { BarchartComponent } from './components/barchart/barchart.component';
import { PiechartComponent } from './components/piechart/piechart.component';

@NgModule({
  declarations: [
    SellerComponent,
    SellerPageComponent,
    BarchartComponent,
    PiechartComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    AdminHeaderModule,
    AdminSidebarModule,
    ProductManagementModule,
  ],
})
export class SellerModule {}
