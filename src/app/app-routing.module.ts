import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./buyer/buyer.module').then((m) => m.BuyerModule),
  },
  {
    path: 'sell',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
