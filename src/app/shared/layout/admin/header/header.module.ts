import { AdminHeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from 'src/app/material.module';
@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [CommonModule, RouterModule, MaterialModules],
  exports: [AdminHeaderComponent],
})
export class AdminHeaderModule {}
