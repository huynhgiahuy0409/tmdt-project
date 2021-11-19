import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MaterialModules } from 'src/app/material.module';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [CommonModule, ProductsRoutingModule, MaterialModules,NgxPaginationModule],
  exports: [ProductListComponent],
})
export class ProductModule {}
