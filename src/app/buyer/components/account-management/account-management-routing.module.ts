import { DigitalBillVerificationComponent } from './digital-bill-verification/digital-bill-verification.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AccountComponent,
  DeliveryAddressComponent,
  PurchaseHistoryComponent,
  WishlistComponent,
} from '.';
import { AccountManagementComponent } from './account-management.component';
import { UserResolve } from '../../services/resolve/user.resovle';
import { ProvinceResolve } from '../../services/resolve/province.resolve';
import { OrderResolve } from '../../services/resolve/order.resolve';

const routes: Routes = [
  {
    path: '',
    component: AccountManagementComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      {
        path: 'account',
        component: AccountComponent,
        resolve: {
          user: UserResolve,
        },
      },
      {
        path: 'purchase-history',
        component: PurchaseHistoryComponent,
        resolve: {
          shopOrders: OrderResolve,
          ordersByUser: OrderResolve
        },
      },
      { path: 'wishlist', component: WishlistComponent },
      {
        path: 'delivery-address',
        component: DeliveryAddressComponent,
        resolve: {
          provinceAll: ProvinceResolve,
        },
      },
      { path: 'digital-bill-verification', component: DigitalBillVerificationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountManagementRoutingModule {}
