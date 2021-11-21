import { PortalComponent } from './portal.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BoardingComponent } from './boarding/boarding.component';
import { ProductComponent } from './product/product.component';
const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', redirectTo: 'onBoarding', pathMatch: 'full' },
      { path: 'onBoarding', component: BoardingComponent },
      { path: 'product', component: ProductComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
