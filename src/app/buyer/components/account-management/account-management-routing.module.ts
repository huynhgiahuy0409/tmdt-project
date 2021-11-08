import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent, DeliveryAddressComponent, PurchaseHistoryComponent, WishlistComponent } from '.';
import { AccountManagementComponent } from './account-management.component';

const routes: Routes = [
  {
    path: '',
    component: AccountManagementComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'purchase-history', component: PurchaseHistoryComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'delivery-address', component: DeliveryAddressComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountManagementRoutingModule {}
