import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BordingComponent } from './bording/bording.component';
import { BoardingComponent } from './boarding/boarding.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    BordingComponent,
    BoardingComponent,
    ProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PortalModule { }
