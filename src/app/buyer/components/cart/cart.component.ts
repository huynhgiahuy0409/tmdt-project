import { debounceTime } from 'rxjs/operators';
import { DIRECT_LINK_IMAGE } from './../../../_models/constance';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartResponse,
  CartItemResponse,
  PendingItemResponse,
  AddressResponse,
} from 'src/app/_models/response';
import { CartService } from '../../services/cart.service';
import { CheckBoxs } from './CheckBoxs';
import { Product } from './Product';
import { SummaryCart, SummaryCartItem } from 'src/app/_models/models';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';
import { ShippingCost, ShippingService } from '../../services/shipping.service';
import { UserService } from '../../services/user.service';
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
  constructor(
    private cartService: CartService,
    private dialogService: DialogService,
    private router: Router,
    private userService: UserService,
    private shippingService: ShippingService
  ) {
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
     
      this.updateSummaryCart()
    });
  }
  private computeTotalSummaryCartItem(cartItemResponse: CartItemResponse, shippingCost: number): number {
    let result = 0
    cartItemResponse.pendingItems.forEach(pendingItem => {
      result += pendingItem.product.buyPrice * pendingItem.quantity
    })
    return result
  }
  private updateSummaryCart(){
    let sltPendingItems: CartItemResponse[] = this.getSltPendingItems();
      let summaryCartItems: SummaryCartItem[] = sltPendingItems.map(cartItemResponse => {
        let summaryCartItem: SummaryCartItem = {
          cartItem: cartItemResponse,
          shipping: {
            type: 'standard',
            cost: {
              cost: 0,
              time: ''
            }
          },
          totalPayment: 0
        }
        return summaryCartItem
      })
      let totalPayment: number = this.getTotalPayment(sltPendingItems);
      let summaryCart: SummaryCart = {
        cartId: this.cartTask.cartId,
        summaryCartItems: summaryCartItems,
        totalCartItem: 0,
        totalShipCost: 0,
        totalPayment: totalPayment
      };
      this.cartService.sumCartBehaviorSubject.next(summaryCart);
  }
  setCartCheckedAll(completed: boolean) {
    this.cartTask.cartItemTasks.forEach((cartItemTask) => {
      cartItemTask.completed = completed;
      cartItemTask.pendingItemTasks.map(
        (pendingItemTask) => (pendingItemTask.completed = completed)
      );
    });
    if (completed == true) {
      this.updateSummaryCart()
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
    this.updateSummaryCart()
  }
  pendingItemChange() {
    this.updateSummaryCart()
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
    this.cartService.removePendingItem(pendingItemId)
    let cart: CartResponse | null = this.cartService.cartBehaviorSubject.value;
    let cartItem = cart?.cartItems.find(
      (cartItem) => cartItem.id === cartItemId
    );
    let filterPendingItems = cartItem!.pendingItems.filter(
      (pendingITem) => pendingITem.id != pendingItemId
    );
    cartItem!.pendingItems = filterPendingItems;
    this.cartService.cartBehaviorSubject.next(cart);
    this.updateSummaryCart()
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
  private getSltPendingItems(): CartItemResponse[] {
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
    return cartItemResponses;
  }
  getTotalPayment(cartItems: CartItemResponse[]): number {
    let result = 0;
    cartItems.forEach(cartItem => {
      cartItem.pendingItems.forEach((pendingItem) => {
        result += pendingItem.product.buyPrice * pendingItem.quantity;
      });
    })
    return result;
  }
  onClickBuyNow() {
    let sltPendingItemCount: number = 0;
    this.cartTask.cartItemTasks.forEach((cartItemTask) => {
      let sltPendingItemLength = cartItemTask.pendingItemTasks.filter(
        (pendingItemTask) => pendingItemTask.completed != false
      ).length;
      sltPendingItemCount += sltPendingItemLength;
    });
    if (sltPendingItemCount > 0) {
      this.router.navigate(['/buyer/checkout']);
    } else {
      this.dialogService.openDialog('500ms', '500ms', {
        title: 'Không có sản phẩm',
        content: 'Bạn vẫn chưa chọn sản phẩm nào để mua.',
      });
    }
  }
}
