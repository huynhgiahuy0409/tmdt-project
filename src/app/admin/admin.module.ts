import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {OrderComponent} from "./order/order.component";
import {AminHeaderModule} from "../shared/layout/admin/header/header.module";


@NgModule({
  declarations: [
    AdminComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AminHeaderModule
  ]
})
export class AdminModule { }
