import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SellerProductAllComponent} from "./product-all/product-all.component";
import {SellerProductAddComponent} from "./product-add/product-add.component";
import {SellerProductAddDetailComponent} from "./product-add-detail/product-add-detail";

const routes: Routes = [
  { path: '', component: SellerProductAllComponent },
  { path: 'add', component: SellerProductAddComponent },
  { path: 'add_detail', component: SellerProductAddDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
