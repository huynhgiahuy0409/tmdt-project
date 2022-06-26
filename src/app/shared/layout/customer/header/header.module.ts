import { UserService } from './../../../../buyer/services/user.service';
import { FormsModule } from '@angular/forms';
import { CustomerHeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModules } from 'src/app/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from 'src/app/buyer/components/home/home.component';

@NgModule({
  declarations: [CustomerHeaderComponent],
  imports: [CommonModule, RouterModule, FormsModule, MaterialModules],
  exports: [CustomerHeaderComponent],
})
export class CustomerHeaderModule {
 
}
