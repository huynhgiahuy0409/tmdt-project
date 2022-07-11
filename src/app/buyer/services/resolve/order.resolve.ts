import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrderResponse } from 'src/app/_models/response';
import { OrderService } from '../order.service';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root',
})
export class OrderResolve implements Resolve<OrderResponse[] | null> {
    constructor(
        private orderService: OrderService,
        private useService: UserService
    ) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | OrderResponse[]
        | Observable<OrderResponse[] | null>
        | Promise<OrderResponse[] | null>
        | null {
        let user = this.useService.userBehaviorSubject.value;
        if (state.url === '/seller/portal/sale/order') {
            console.log("/seller/portal/sale/order");
            
            let shopId = user!.shop.id;
            return this.orderService.findAllByShop(shopId);
        } else if (state.url === '/buyer/account-management/purchase-history') {
            console.log("/buyer/account-management/purchase-history");
            return this.orderService.findAllByUser(user!.id);
        }
        return of(null);
    }
}
