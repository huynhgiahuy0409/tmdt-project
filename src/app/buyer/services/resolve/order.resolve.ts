import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { OrderResponse } from "src/app/_models/response";
import { OrderService } from "../order.service";
import { UserService } from "../user.service";

@Injectable({
    providedIn: 'root'
})
export class OrderResolve implements Resolve<OrderResponse[]>{
    constructor(private orderService: OrderService, private useService: UserService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OrderResponse[] | Observable<OrderResponse[]> | Promise<OrderResponse[]> {
        let user = this.useService.userBehaviorSubject.value
        let shopId = user!.shop.id    
        return this.orderService.findAllByShop(shopId)
    }
    
}
