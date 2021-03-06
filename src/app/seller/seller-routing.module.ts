import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerPageComponent } from './components/page/page.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { RatingManagementComponent } from './components/rating-management/rating-management.component';
import { LoginComponent } from '../buyer/components/login/login.component';
import { AuthGuard } from '../_helpers/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'page', component: SellerPageComponent },
      { path: 'barchart', component: BarchartComponent },
      { path: 'piechart', component: PiechartComponent },
      {
        path: 'portal',
        loadChildren: () =>
          import('./components/portal/portal.module').then(
            (m) => m.PortalModule
          ),
      },
      { path: 'rating', component: RatingManagementComponent },
      { path: '', redirectTo: 'portal', pathMatch: 'full' },
      {
        path: 'product-management',
        canActivate: [AuthGuard],
        loadChildren: () =>
        import(
          './components/product-management/product-management.module'
          ).then((m) => m.ProductManagementModule),
        },
      ],
    },
    {
      path: 'login',
      component: LoginComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
