import { debounceTime } from 'rxjs/operators';
import { DIRECT_LINK_IMAGE } from './../../../_models/constance';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartResponse,
  CartItemResponse,
  PendingItemResponse,
} from 'src/app/_models/response';
import { CartService } from '../../services/cart.service';
import { CheckBoxs } from './CheckBoxs';
import { Product } from './Product';
import { SummaryCart } from 'src/app/_models/models';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';
export interface CartTask {
  cartId: number;
  completed: boolean;
  cartItemTasks: CartItemTask[];
}
export interface CartItemTask {
  cartItemResponse: CartItemResponse;
  completed: boolean;
  pendingItemTasks: PendingItemTask[];
}
export interface PendingItemTask {
  pendingItemResponse: PendingItemResponse;
  completed: boolean;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  directLinkImage = `${DIRECT_LINK_IMAGE}/`;
  cart$!: Observable<CartResponse | null>;
  sumCart$!: Observable<SummaryCart | null>;
  cartTask!: CartTask;
  totalPendingItem: number = 0;
  constructor(private cartService: CartService, private dialogService: DialogService, private router: Router) {
    this.cart$ = this.cartService.cart$;
    this.sumCart$ = this.cartService.sumCart$;
  }

  ngOnInit(): void {
    this.cart$.subscribe((cart) => {
      let cartItemTasks: CartItemTask[] = [];
      let cartItems: CartItemResponse[] = cart!.cartItems;
      this.totalPendingItem = 0;
      cartItems.forEach((cartItem: CartItemResponse, cartItemIndex: number) => {
        let pendingItemTasks: PendingItemTask[] = [];
        let pendingItems: PendingItemResponse[] = cartItem.pendingItems;
        this.totalPendingItem += pendingItems.length;
        pendingItems.forEach(
          (pendingItem: PendingItemResponse, pendingItemIndex: number) => {
            let pendingItemCompleted = this.cartTask
              ? this.cartTask.cartItemTasks[cartItemIndex].pendingItemTasks[
                  pendingItemIndex
                ].completed
              : false;
            let pendingItemTask: PendingItemTask = {
              pendingItemResponse: pendingItem,
              completed: pendingItemCompleted,
            };
            pendingItemTasks.push(pendingItemTask);
          }
        );
        let cartItemCompleted = this.cartTask
          ? this.cartTask.cartItemTasks[cartItemIndex].completed
          : false;
        let cartItemTask: CartItemTask = {
          cartItemResponse: cartItem,
          completed: cartItemCompleted,
          pendingItemTasks: pendingItemTasks,
        };
        cartItemTasks.push(cartItemTask);
      });
      let cartCompleted = this.cartTask ? this.cartTask.completed : false;
      this.cartTask = {
        cartId: cart!.id,
        completed: cartCompleted,
        cartItemTasks: cartItemTasks,
      };
      let sltCartResponse: CartResponse = this.getSltPendingItems();
      let totalPayment: number = this.getTotalPayment(sltCartResponse);
      this.cartService.sumCartBehaviorSubject.next({
        summaryCart: sltCartResponse,
        totalPayment: totalPayment,
      });
    });
  }
  setCartCheckedAll(completed: boolean) {
    this.cartTask.cartItemTasks.forEach((cartItemTask) => {
      cartItemTask.completed = completed;
      cartItemTask.pendingItemTasks.map(
        (pendingItemTask) => (pendingItemTask.completed = completed)
      );
    });
    if (completed == true) {
      let sltCartResponse: CartResponse = this.getSltPendingItems();
      let totalPayment: number = this.getTotalPayment(sltCartResponse);
      this.cartService.sumCartBehaviorSubject.next({
        summaryCart: sltCartResponse,
        totalPayment: totalPayment,
      });
    } else {
      this.cartService.sumCartBehaviorSubject.next(null);
    }
  }
  setCartItemCheckedAll(completed: boolean, cartItemIndex: number) {
    let pendingItemTasks: PendingItemTask[] =
      this.cartTask.cartItemTasks[cartItemIndex].pendingItemTasks;

    pendingItemTasks.forEach((pendingItemTask) => {
      pendingItemTask.completed = completed;
    });

    this.cartTask.completed = this.cartTask.cartItemTasks.every(
      (cartItemTask) => cartItemTask.completed
    );
    let sltCartResponse: CartResponse = this.getSltPendingItems();
    let totalPayment: number = this.getTotalPayment(sltCartResponse);
    this.cartService.sumCartBehaviorSubject.next({
      summaryCart: sltCartResponse,
      totalPayment: totalPayment,
    });
  }
  pendingItemChange() {
    let sltCartResponse: CartResponse = this.getSltPendingItems();
    let totalPayment: number = this.getTotalPayment(sltCartResponse);
    this.cartService.sumCartBehaviorSubject.next({
      summaryCart: sltCartResponse,
      totalPayment: totalPayment,
    });
  }
  changeQuantity(quantity: string, cartItemId: number, pendingItemId: number) {
    this.cartService
      .updatePendingItem(pendingItemId, Number.parseInt(quantity))
      .subscribe();
    let cart: CartResponse | null = this.cartService.cartBehaviorSubject.value;
    let cartItem = cart?.cartItems.find(
      (cartItem) => cartItem.id === cartItemId
    );
    let pendingItem = cartItem!.pendingItems.find(
      (pendingItem) => pendingItem.id === pendingItemId
    );
    pendingItem!.quantity = Number.parseInt(quantity);
    this.cartService.cartBehaviorSubject.next(cart);
  }
  removePendingItem(cartItemId: number, pendingItemId: number) {
    // this.cartService.removePendingItem(pendingItemId)
    let cart: CartResponse | null = this.cartService.cartBehaviorSubject.value;
    let cartItem = cart?.cartItems.find(
      (cartItem) => cartItem.id === cartItemId
    );
    let filterPendingItems = cartItem!.pendingItems.filter(
      (pendingITem) => pendingITem.id != pendingItemId
    );
    cartItem!.pendingItems = filterPendingItems;
    this.cartService.cartBehaviorSubject.next(cart);
    let sltCartResponse: CartResponse = this.getSltPendingItems();
    let totalPayment: number = this.getTotalPayment(sltCartResponse);
    this.cartService.sumCartBehaviorSubject.next({
      summaryCart: sltCartResponse,
      totalPayment: totalPayment,
    });
  }
  getTotalSltPendingItem(): number {
    let result: number = 0;
    this.cartTask.cartItemTasks.forEach((cartItemTask) => {
      result += cartItemTask.pendingItemTasks.filter(
        (pendingItemTask) => pendingItemTask.completed != false
      ).length;
    });
    return result;
  }
  private getSltPendingItems(): CartResponse {
    let cartItemResponses: CartItemResponse[] = [];
    this.cartTask.cartItemTasks.forEach((cartItemTask) => {
      const { id, shop } = cartItemTask.cartItemResponse;
      let sltPendingItems: PendingItemResponse[] = cartItemTask.pendingItemTasks
        .filter((cit) => cit.completed == true)
        .map((pendingItemTask) => pendingItemTask.pendingItemResponse);
      let cartItemResponse: CartItemResponse = {
        id: id,
        pendingItems: sltPendingItems,
        shop: shop,
      };
      cartItemResponses.push(cartItemResponse);
    });
    let cartResponse: CartResponse = {
      id: this.cartTask.cartId,
      cartItems: cartItemResponses,
    };
    return cartResponse;
  }
  getTotalPayment(cartResponse: CartResponse): number {
    let result = 0;
    cartResponse.cartItems.forEach((cartItem) => {
      cartItem.pendingItems.forEach((pendingItem) => {
        result += pendingItem.product.buyPrice * pendingItem.quantity;
      });
    });
    return result;
  }
  onClickBuyNow(){
    let sltPendingItemCount: number = 0
    this.cartTask.cartItemTasks.forEach(cartItemTask => {
      let sltPendingItemLength = cartItemTask.pendingItemTasks.filter(pendingItemTask => pendingItemTask.completed != false).length
      sltPendingItemCount += sltPendingItemLength
    })
    if(sltPendingItemCount > 1){
      this.router.navigate(['/buyer/checkout'])
    }else{
      this.dialogService.openDialog("500ms", "500ms",{
        title: "Không có sản phẩm",
        content: "Bạn vẫn chưa chọn sản phẩm nào để mua."
      })
    }
  }
}
