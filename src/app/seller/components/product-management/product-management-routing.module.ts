import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerProductAddComponent } from './product-add/product-add.component';
import { SellerProductAddDetailComponent } from './product-add-detail/product-add-detail';
import { ProductManagementComponent } from './product-management.component';
import { ShopResolve } from '../../services/resolve/shop.resolve';

const routes: Routes = [
  {
    path: '', component: ProductManagementComponent, children: [
      { path: '', redirectTo: 'portal', pathMatch: 'full' },
      { path: 'category', component: SellerProductAddComponent },
      { path: 'add-detail', component: SellerProductAddDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ShopResolve]
})
export class ProductManagementRoutingModule { }
