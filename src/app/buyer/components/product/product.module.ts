import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MaterialModules } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductComponent } from './product.component';
import { ProvinceResolve } from '../../services/resolve/province.resolve';
import { SvgModule } from 'src/app/shared/svg/star/svg.module';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductDetailComponent, ProductFilterComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModules,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SvgModule
  ],
  exports: [ProductListComponent],
})
export class ProductModule {}
