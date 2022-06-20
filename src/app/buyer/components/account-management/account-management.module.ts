import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementRoutingModule } from './account-management-routing.module';

import { AccountManagementComponent } from './account-management.component';
import { AccountComponent, UpdateContactDiagLog } from './account/account.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { DeliveryAddressComponent, UpdateAddressDiagLog } from './delivery-address/delivery-address.component';
import { MaterialModules } from 'src/app/material.module';
import { UserResolve } from './services/resolve/user.resovle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountManagementComponent,
    AccountComponent,
    PurchaseHistoryComponent,
    WishlistComponent,
    DeliveryAddressComponent,
    UpdateContactDiagLog,
    UpdateAddressDiagLog
  ],
  imports: [
    CommonModule,
    AccountManagementRoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserResolve]
})
export class AccountManagementModule { }
