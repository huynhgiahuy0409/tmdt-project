import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerProductAllComponent } from './product-all/product-all.component';
import { SellerProductAddComponent } from './product-add/product-add.component';
import { SellerProductAddDetailComponent } from './product-add-detail/product-add-detail';
import { ProductManagementComponent } from './product-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: ProductManagementComponent },
  { path: 'category', component: SellerProductAddComponent },
  { path: 'add-detail', component: SellerProductAddDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagementRoutingModule {}
