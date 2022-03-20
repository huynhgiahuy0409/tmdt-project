import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerProductAllComponent } from './product-all/product-all.component';
import { SellerProductAddComponent } from './product-add/product-add.component';
import { AdminSidebarModule } from '../../../shared/layout/admin/sidebar/sidebar.module';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { SellerProductAddDetailComponent } from './product-add-detail/product-add-detail';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHeaderModule } from '../../../shared/layout/admin/header/header.module';
import { ProductManagementComponent } from './product-management.component';
import { MaterialModules } from 'src/app/material.module';
@NgModule({
  declarations: [
    SellerProductAllComponent,
    SellerProductAddComponent,
    SellerProductAddDetailComponent,
    ProductManagementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductManagementRoutingModule,
    ReactiveFormsModule,
    AdminSidebarModule,
    AdminHeaderModule,
    MaterialModules,
  ],
  exports: [SellerProductAllComponent],
})
export class ProductManagementModule {}
