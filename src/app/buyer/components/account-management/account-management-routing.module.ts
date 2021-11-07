import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent, PurchaseHistoryComponent } from '.';
import { AccountManagementComponent } from './account-management.component';

const routes: Routes = [
  {
    path: '',
    component: AccountManagementComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'purchase-history', component: PurchaseHistoryComponent },
      { path: 'wishlist', component: PurchaseHistoryComponent },
      { path: 'delivery-address', component: PurchaseHistoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountManagementRoutingModule {}
