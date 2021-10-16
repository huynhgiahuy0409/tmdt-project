import {ProductsComponent} from "./products/products.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {HomePageComponent} from "./home-page/home-page.component";
import {ListProductComponent} from "./products/list-product/list-product.component";

const routes: Routes = [
  // { path: '',   redirectTo: '/homepage', pathMatch: 'full' },
  {path: 'homepage', component: HomePageComponent},
  {
    path: 'product', component: ProductsComponent,
    children: [
      {
        path: '',component: ListProductComponent,
      }
    ],
  },
];


@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {}
