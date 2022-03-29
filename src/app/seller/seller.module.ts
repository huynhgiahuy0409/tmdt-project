import { RouterModule } from '@angular/router';
import { PostService } from './../buyer/post.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerPageComponent } from './components/page/page.component';
import { AdminHeaderModule } from '../shared/layout/admin/header/header.module';
import { AdminSidebarModule } from '../shared/layout/admin/sidebar/sidebar.module';

import { ProductManagementModule } from './components/product-management/product-management.module';
import { BarchartComponent } from './components/barchart/barchart.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { RatingManagementComponent } from './components/rating-management/rating-management.component';
import { MaterialModules } from '../material.module';
import { PortalModule } from './components/portal/portal.module';

@NgModule({
  declarations: [
    SellerComponent,
    SellerPageComponent,
    BarchartComponent,
    PiechartComponent,
    RatingManagementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SellerRoutingModule,
    AdminHeaderModule,
    AdminSidebarModule,
    ProductManagementModule,
    PortalModule,

    MaterialModules,
  ],
})
export class SellerModule {}
