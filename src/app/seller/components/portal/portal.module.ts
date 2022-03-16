import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { BoardingComponent } from './boarding/boarding.component';
import { ProductComponent } from './product/product.component';
import { PortalComponent } from './portal.component';
import { MaterialModules } from 'src/app/material.module';



@NgModule({
  declarations: [
    PortalComponent,
    BoardingComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModules
  ]
})
export class PortalModule { }
