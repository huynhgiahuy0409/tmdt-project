import { CustomerHeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [CustomerHeaderComponent],
    imports: [CommonModule, RouterModule],
  exports: [
    CustomerHeaderComponent
  ]
=======
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomerHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [CustomerHeaderComponent],
>>>>>>> 11b114d024a10fae7fb43f55f77790a9e8e76017
})
export class CustomerHeaderModule {}
