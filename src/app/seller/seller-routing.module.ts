import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerPageComponent } from './component/page/page.component';
import {BarchartComponent} from "./components/barchart/barchart.component";
import {PiechartComponent} from "./components/piechart/piechart.component";
const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    children: [
      { path: '', redirectTo: 'portal', pathMatch: 'full'},
      { path: 'portal', loadChildren: () => import('./component/portal/portal.module').then(m => m.PortalModule)},
      { path: 'productManagement', loadChildren: () => import('./component/product-management/product-management.module').then(m => m.ProductManagementModule) },
      { path: 'page', component: SellerPageComponent },
      { path: 'barchart', component: BarchartComponent},
      { path: 'piechart', component: PiechartComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
