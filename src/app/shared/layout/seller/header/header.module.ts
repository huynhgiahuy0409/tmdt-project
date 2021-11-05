import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {SellerHeaderComponent} from "./header.component";
@NgModule({
  declarations: [SellerHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    SellerHeaderComponent
  ]
})
export class SellerHeaderModule {}
