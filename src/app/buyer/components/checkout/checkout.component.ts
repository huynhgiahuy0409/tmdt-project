import { map } from 'rxjs/operators';
import { ShippingCost } from './../../services/shipping.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  COD_PAYMENT_METHOD,
  DIRECT_LINK_IMAGE,
  MOMO_PAYMENT_METHOD,
  PENDING_ORDER_STATUS,
  UNPAID_PAYMENT_STATUS,
} from 'src/app/_models/constance';
import { SummaryCart, SummaryCartItem } from 'src/app/_models/models';
import {
  AddressResponse,
  CartItemResponse,
  OrderResponse,
  UserResponse,
} from 'src/app/_models/response';
import { AddressService } from '../../services/address.service';
import { CartService } from '../../services/cart.service';
import { ShippingService } from '../../services/shipping.service';
import { UserService } from '../../services/user.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderItemRequest, OrderRequest } from 'src/app/_models/request';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  directLinkImage = `${DIRECT_LINK_IMAGE}/`;
  sumCart$!: Observable<SummaryCart | null>;
  user$!: Observable<UserResponse | null>;
  sltAddressId!: number;
  isChangeAddress: boolean = false;
  shipType: 'standard' | 'fast' = 'standard';
  paymentMethods = [
    [COD_PAYMENT_METHOD, 'Thanh toán khi nhận hàng'],
    [MOMO_PAYMENT_METHOD, 'Ví Momo'],
  ];
  sltMethodIdx: number = 0;
  constructor(
    private cartService: CartService,
    private shippingService: ShippingService,
    private userService: UserService,
    private addressService: AddressService,
    private orderService: OrderService,
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.sumCart$ = cartService.sumCart$;
    this.user$ = userService.user$;
  }
  ngOnInit(): void {
    let user = this.userService.userBehaviorSubject.value;
    this.sltAddressId = user!.addresses.find(
      (address) => address.status === 1
    )!.id;
    let summaryCart: SummaryCart | null =
      this.cartService.sumCartBehaviorSubject.value;
    if (summaryCart) {
      summaryCart.summaryCartItems.forEach((summaryCartItem) => {
        summaryCartItem.shipping = {
          type: 'standard',
          cost: this.computeShippingCost(summaryCartItem.cartItem, 'standard'),
        };
        summaryCartItem.totalPayment =
          summaryCartItem.shipping.cost.cost +
          this.computeCartItem(summaryCartItem.cartItem);
      });
      summaryCart.totalShipCost = this.computeTotalShipCost(summaryCart);
      summaryCart.totalCartItem = this.computeTotalCartItem(summaryCart);
      summaryCart.totalPayment = this.computeTotalPaymentSumCart(summaryCart);
    }
  }
  getSummaryCartItem(cartItem: CartItemResponse): number {
    let result = 0;
    cartItem.pendingItems.forEach((pendingItem) => {
      result += pendingItem.product.buyPrice * pendingItem.quantity;
    });
    return result;
  }
  saveSltAddress() {
    let user = this.userService.userBehaviorSubject.value;
    let addressResponse: AddressResponse | undefined = user!.addresses.find(
      (address) => address.id === this.sltAddressId
    );
    if (addressResponse) {
      user?.addresses.map((address) => (address.status = 0));
      addressResponse.status = 1;
      this.addressService.editAddress(addressResponse, user!.id).subscribe();
    }
    this.userService.userBehaviorSubject.next(user);
    this.isChangeAddress = false;
  }
  getShopAddress(cartItem: CartItemResponse): AddressResponse | undefined {
    console.log(cartItem.shop);
    let shopAddressResponse: AddressResponse | undefined =
      cartItem.shop.shopUser.addresses.find((address) => address.status === 1);
    console.log(shopAddressResponse);
    return shopAddressResponse;
  }
  getBuyerAddress(): AddressResponse | undefined {
    let user = this.userService.userBehaviorSubject.value;
    let buyerAddressResponse: AddressResponse | undefined =
      user?.addresses.find((address) => address.status === 1);
    return buyerAddressResponse;
  }
  computeCartItem(cartItem: CartItemResponse) {
    let result = 0;
    cartItem.pendingItems.forEach((pendingItem) => {
      result += pendingItem.product.buyPrice * pendingItem.quantity;
    });
    return result;
  }
  computeShippingCost(
    cartItem: CartItemResponse,
    type: 'standard' | 'fast'
  ): ShippingCost {
    let weight = 0;
    cartItem.pendingItems.forEach((pendingItem) => {
      const { quantity, product } = pendingItem;
      weight += (product.size.weight / 1000) * quantity;
    });

    let shopCode = this.getShopAddress(cartItem)!.province.code;
    let shopDomain = this.getShopAddress(cartItem)!.province.domain;
    let buyerCode = this.getBuyerAddress()!.province.code;
    let buyerDomain = this.getBuyerAddress()!.province.domain;
    return this.shippingService.getShipCost(
      shopCode,
      shopDomain,
      buyerCode,
      buyerDomain,
      weight,
      type
    );
  }
  computeTotalCartItem(summaryCart: SummaryCart) {
    let result = 0;
    summaryCart.summaryCartItems.forEach((summaryCartItem) => {
      summaryCartItem.cartItem.pendingItems.forEach((pendingItem) => {
        result += pendingItem.product.buyPrice * pendingItem.quantity;
      });
    });
    return result;
  }
  computeTotalShipCost(summaryCart: SummaryCart) {
    let result = 0;
    summaryCart.summaryCartItems.forEach((summaryCartItem) => {
      result += summaryCartItem.shipping.cost.cost;
    });
    return result;
  }
  computeTotalPaymentSumCart(summaryCart: SummaryCart) {
    let result = 0;
    summaryCart.summaryCartItems.forEach((summaryCartItem) => {
      result += summaryCartItem.totalPayment
    });
    return result;
  }
  onClickChangeShippingUnit(cartItem: CartItemResponse) {
    let data = {
      standard: this.computeShippingCost(cartItem, 'standard'),
      fast: this.computeShippingCost(cartItem, 'fast'),
    };
    this.matDialog.open(ShippingDialog, { data: data });
  }
  onClickSltMethod(idx: number) {
    this.sltMethodIdx = idx;
  }
  onClickOrder() {
    const paymentMethod = this.paymentMethods[this.sltMethodIdx];
    const paymentMethodCode = paymentMethod[0];
    const confirmDialogRef = this.matDialog.open(ConfirmOrderDialog, {
      width: 'auto',
      height: 'auto',
    });
    
    confirmDialogRef.afterClosed().subscribe((response) => {
      let isCreateElectBill: boolean = response.isCreateElectBill;
      let user: UserResponse | null =
        this.userService.userBehaviorSubject.value;
      let userAddressResponse: AddressResponse | undefined =
        user!.addresses.find((addressResponse) => addressResponse.status === 1);
      let orderAddress: string = `${userAddressResponse?.detailAddress}-${userAddressResponse?.ward.prefix} ${userAddressResponse?.ward.name}, ${userAddressResponse?.district.prefix} ${userAddressResponse?.district.name}, ${userAddressResponse?.province.name}`;
      let orderPhoneNumber: string = userAddressResponse!.phoneNumber;
      let orderBy: string = userAddressResponse!.fullName;
      let sumCart: SummaryCart | null =
        this.cartService.sumCartBehaviorSubject.value;
      const orderResponses: OrderResponse[] = []
      sumCart?.summaryCartItems.forEach((summaryCartItem: SummaryCartItem) => {
        console.log(summaryCartItem);
        
        const { cartItem, shipping, totalPayment } = summaryCartItem;
        const { shop } = cartItem;
        const shopAddressResponse: AddressResponse | undefined =
          shop.shopUser.addresses.find(
            (addressResponse) => addressResponse.status === 1
          );
        const shopAddress: string = `${shopAddressResponse!.detailAddress}-${
          shopAddressResponse?.ward.prefix
        } ${shopAddressResponse?.ward.name}, ${
          shopAddressResponse?.district.prefix
        } ${shopAddressResponse?.district.name}, ${
          shopAddressResponse?.province.name
        }`;
        const shopNumberPhone: string = shopAddressResponse!.phoneNumber;
        const shopName: string = shopAddressResponse!.fullName;
        const orderItemRequests: OrderItemRequest[] = cartItem.pendingItems.map(
          (pendingItem) => {
            const { product, quantity } = pendingItem;
            let orderItemRequest: OrderItemRequest = {
              productId: product.id,
              quantity: quantity,
            };
            return orderItemRequest;
          }
        );
        const shopId: number = cartItem.shop.id;
        const orderRequest: OrderRequest = {
          status: PENDING_ORDER_STATUS,
          paymentStatus: UNPAID_PAYMENT_STATUS,
          paymentMethod: paymentMethodCode,
          orderItems: orderItemRequests,
          shopId: shopId,
          orderBy: orderBy,
          orderAddress: orderAddress,
          orderPhoneNumber: orderPhoneNumber,
          sendBy: shopName,
          sendPhoneNumber: shopNumberPhone,
          sendAddress: shopAddress,
          cartItemCost: this.computeCartItem(cartItem),
          shippingCost: shipping.cost.cost,
          paymentCost: totalPayment,
        };
        this.orderService
          .createOrder(user!.id, orderRequest)
          .subscribe((createdOrder) => {
            console.log(createdOrder);
            
            orderResponses.push(createdOrder)
            this.orderService.receiptBehaviorSubject.next(orderResponses)
            if (paymentMethodCode === COD_PAYMENT_METHOD) {
              this.router.navigate([
                '/buyer/account-management/purchase-history',
              ]);
            } else {
              this.orderService.orderBehaviorSubject.next(createdOrder)
              this.router.navigate(['/buyer/payment']);
            }
          });
      });
    });
  }
}

@Component({
  templateUrl: './shipping-unit.dialog.html',
  styleUrls: ['./checkout.component.scss'],
})
export class ShippingDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
@Component({
  templateUrl: './confirm-order.dialog.html',
  styleUrls: ['./checkout.component.scss'],
})
export class ConfirmOrderDialog implements OnInit {
  isCreateElectBill: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onClickConfirm() {
    this.dialogRef.close({
      isCreateElectBill: this.isCreateElectBill,
    });
  }
}
