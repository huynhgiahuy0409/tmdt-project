import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SellerProductAllComponent} from "./product-all/product-all.component";
import {SellerProductAddComponent} from "./product-add/product-add.component";
import {AdminSidebarModule} from "../../../shared/layout/admin/sidebar/sidebar.module";
import {ProductManagementRoutingModule} from "./product-management-routing.module";
import {SellerProductAddDetailComponent} from "./product-add-detail/product-add-detail";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminHeaderModule} from "../../../shared/layout/admin/header/header.module";
@NgModule({
  declarations: [
    SellerProductAllComponent,
    SellerProductAddComponent,
    SellerProductAddDetailComponent

  ],
  exports: [
  SellerProductAllComponent
  ],
    imports: [
        CommonModule,
        AdminSidebarModule,
        ProductManagementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AdminHeaderModule,

    ]
})
export class ProductManagementModule { }
