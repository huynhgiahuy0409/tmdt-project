import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ListProductComponent} from "./products/list-product/list-product.component";
import {ProductsComponent} from "./products/products.component";

const routes: Routes = [
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
