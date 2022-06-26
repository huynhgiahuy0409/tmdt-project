import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { ShopResponse } from 'src/app/_models/response';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/buyer/services/user.service';
import { ShopService } from '../shop.service';

@Injectable()
export class ShopResolve implements Resolve<ShopResponse | null> {
  constructor(
    private shopService: ShopService,
    private userService: UserService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | ShopResponse
    | Observable<ShopResponse | null>
    | Promise<ShopResponse | null>
    | null {
    return this.shopService.findShopByUserId(
      this.userService.userBehaviorSubject.value!.id
    );
  }
}
