import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerPageComponent } from './component/page/page.component';

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
      { path: 'productManagement', loadChildren: () => import('./component/product-management/product-management.module').then(m => m.ProductManagementModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
