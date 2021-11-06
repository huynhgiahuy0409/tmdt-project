import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AdminSidebarComponent} from "./sidebar.component";
@NgModule({
  declarations: [AdminSidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    AdminSidebarComponent
  ]
})
export class AdminSidebarModule {}
