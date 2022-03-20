import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from 'src/app/material.module';
import { SidebarRoutingModule } from './sidebar-routing.module';
import { AdminSidebarComponent } from './sidebar.component';
@NgModule({
  declarations: [AdminSidebarComponent],
  imports: [CommonModule, RouterModule, MaterialModules, SidebarRoutingModule],
  exports: [AdminSidebarComponent],
})
export class AdminSidebarModule {}
