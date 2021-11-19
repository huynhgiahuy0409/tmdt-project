import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SellerProductAllComponent} from "./product-all/product-all.component";
import {SellerProductAddComponent} from "./product-add/product-add.component";
import {AdminSidebarModule} from "../../../shared/layout/admin/sidebar/sidebar.module";
import {ProductManagementRoutingModule} from "./product-management-routing.module";
@NgModule({
  declarations: [
    SellerProductAllComponent,
    SellerProductAddComponent

  ],
  exports: [
  SellerProductAllComponent
  ],
  imports: [
    CommonModule,
    AdminSidebarModule,
    ProductManagementRoutingModule,

  ]
})
export class ProductManagementModule { }