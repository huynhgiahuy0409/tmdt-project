import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SellerProductAllComponent} from "./product-all/product-all.component";
import {SellerProductAddComponent} from "./product-add/product-add.component";

const routes: Routes = [
  { path: '', component: SellerProductAllComponent },
  { path: 'add', component: SellerProductAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
