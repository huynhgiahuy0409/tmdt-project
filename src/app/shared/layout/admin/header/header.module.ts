import {AdminHeaderComponent} from './header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    AdminHeaderComponent
  ]
})
export class AminHeaderModule {}
