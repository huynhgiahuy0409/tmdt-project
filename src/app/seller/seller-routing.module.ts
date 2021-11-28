import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerPageComponent } from './page/page.component';
import {BarchartComponent} from "./components/barchart/barchart.component";
import {PiechartComponent} from "./components/piechart/piechart.component";
import {ShopInforComponent} from "./components/shop-infor/shop-infor.component";

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    children: [
      {
        path: '',
        redirectTo: 'page', pathMatch: 'full'
      },
      { path: 'page', component: SellerPageComponent },
      { path: 'barchart', component: BarchartComponent},
      { path: 'piechart', component: PiechartComponent},
      { path: 'information', component: ShopInforComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
