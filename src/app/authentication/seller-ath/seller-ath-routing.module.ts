import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAthComponent } from './seller-ath.component';

const routes: Routes = [{ path: '', component: SellerAthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerAthRoutingModule { }
