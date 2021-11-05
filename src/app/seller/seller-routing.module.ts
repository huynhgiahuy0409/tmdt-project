import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import {SellerPageComponent} from "./page/page.component";

const routes: Routes = [{ path: '', component: SellerComponent },
  { path: 'page', component:  SellerPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
