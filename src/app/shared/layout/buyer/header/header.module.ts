import { UserService } from '../../../../buyer/services/user.service';
import { FormsModule } from '@angular/forms';
import { BuyerHeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModules } from 'src/app/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from 'src/app/buyer/components/home/home.component';
import { HeaderWithSearchComponent } from './components/header-with-search/header-with-search.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [BuyerHeaderComponent, HeaderWithSearchComponent, NavBarComponent],
  imports: [CommonModule, RouterModule, FormsModule, MaterialModules],
  exports: [BuyerHeaderComponent],
})
export class BuyerHeaderModule {}
