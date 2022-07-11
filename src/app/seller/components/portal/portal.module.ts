import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { BoardingComponent } from './boarding/boarding.component';
import { ProductComponent } from './product/product.component';
import { PortalComponent } from './portal.component';
import { MaterialModules } from 'src/app/material.module';
import { AdminSidebarModule } from 'src/app/shared/layout/admin/sidebar/sidebar.module';
import { SaleComponent } from './sale/sale.component';
import { OrderAllSectionComponent } from './sale/order-all-section/order-all-section.component';
import { KeyComponent } from './product/key/key.component';
import { DigitalBillProcessComponent } from './digital-bill-process/digital-bill-process.component';
import { ProductListSectionComponent } from './product/product-list-section/product-list-section.component';



@NgModule({
  declarations: [
    PortalComponent,
    BoardingComponent,
    ProductComponent,
    ProductListSectionComponent,
    SaleComponent,
    OrderAllSectionComponent,
    KeyComponent,
    DigitalBillProcessComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModules,
    AdminSidebarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PortalModule { }
