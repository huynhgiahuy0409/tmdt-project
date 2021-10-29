import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductsRoutingModule} from "./product-routing.module";
import {ProductDetailComponent} from "./product-detail/product-detail.component";





@NgModule({
  declarations: [ProductListComponent,ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
  ]
})
export class ProductModule { }
