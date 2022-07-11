import { PortalComponent } from './portal.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BoardingComponent } from './boarding/boarding.component';
import { ProductComponent } from './product/product.component';
import { ShopResolve } from '../../services/resolve/shop.resolve';
import { SaleComponent } from './sale/sale.component';
import { OrderResolve } from 'src/app/buyer/services/resolve/order.resolve';
import { KeyComponent } from './product/key/key.component';
import { DigitalBillProcessComponent } from './digital-bill-process/digital-bill-process.component';
import { PiechartComponent } from '../piechart/piechart.component';
const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', redirectTo: 'product', pathMatch: 'full' },
      { path: 'product', component: ProductComponent },
      { path: 'key', component: KeyComponent },
      { path: 'digital-bill', component: DigitalBillProcessComponent },
      {
        path: 'sale/order',
        component: SaleComponent,
        resolve: {
          orders: OrderResolve,
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
