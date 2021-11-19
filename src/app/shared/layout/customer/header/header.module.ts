import { CustomerHeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { MaterialModules } from 'src/app/material.module';
@NgModule({
  declarations: [CustomerHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CustomerHeaderComponent
  ]
})
export class CustomerHeaderModule {}
