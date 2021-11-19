import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementRoutingModule } from './account-management-routing.module';

import { AccountManagementComponent } from './account-management.component';
import { AccountComponent } from './account/account.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { MaterialModules } from 'src/app/material.module';


@NgModule({
  declarations: [
    AccountManagementComponent,
    AccountComponent,
    PurchaseHistoryComponent,
    WishlistComponent,
    DeliveryAddressComponent,
  ],
  imports: [
    CommonModule,
    AccountManagementRoutingModule,
    MaterialModules
  ]
})
export class AccountManagementModule { }
