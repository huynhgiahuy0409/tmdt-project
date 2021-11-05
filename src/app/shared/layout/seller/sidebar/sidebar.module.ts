import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {SellerSidebarComponent} from "./sidebar.component";
@NgModule({
  declarations: [SellerSidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    SellerSidebarComponent
  ]
})
export class SellerSidebarModule {}
