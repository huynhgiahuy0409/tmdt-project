import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductsRoutingModule} from "./product-routing.module";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {MatExpansionModule} from "@angular/material/expansion";





@NgModule({
    declarations: [ProductListComponent, ProductDetailComponent
    ],
    exports: [
        ProductListComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
  declarations: [ProductListComponent,ProductDetailComponent
  ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        MatExpansionModule,
    ]
})
export class ProductModule { }
