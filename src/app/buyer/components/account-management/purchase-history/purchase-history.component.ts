import { Observable } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PENDING_ORDER_STATUS, SHIPPING_ORDER_STATUS, DELIVERED_ORDER_STATUS, PAID_PAYMENT_STATUS, UNPAID_PAYMENT_STATUS, MOMO_PAYMENT_METHOD, COD_PAYMENT_METHOD } from './../../../../_models/constance';
import { CANCEL_ORDER_STATUS, DIRECT_LINK_DIG_BILL } from 'src/app/_models/constance';
import { CartItemResponse, OrderItemResponse, OrderResponse } from './../../../../_models/response';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from 'src/app/buyer/services/order.service';
import { UserService } from 'src/app/buyer/services/user.service';
import { SummaryCart, SummaryCartItem } from 'src/app/_models/models';
export interface OrderElement {
  orderId: number;
  status: string;
  paymentStatus: string;
  cartItemCost: number;
  shippingCost: number;
  paymentCost: number;
  action: [string, string][];
  digitalBill?: string;
  digitalBillHash?: string;
}

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  directLinkDigitalBill = `${DIRECT_LINK_DIG_BILL}/`
  displayedColumns: string[] = ['orderId', 'status', 'paymentStatus',  'cartItemCost', 'shippingCost', 'paymentCost', 'action', 'digitalBillHash'];
  orderDataSource!: MatTableDataSource<OrderElement>;
  orderElementDataList: OrderElement[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.orderDataSource.paginator = this.paginator;
  }
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    let orders = this.activatedRoute.snapshot.data.ordersByUser
    this.orderElementDataList = orders.map((order: OrderResponse) => {
      const {id, status, paymentStatus, cartItemCost, shippingCost, paymentCost, digitalBillHash} = order
      let action: [string, string][] =  [["see","Xem"]]
      let orderStatusLabel = this.orderService.setupOrderStatus(status)
      let orderPaymentStatusLabel = this.orderService.setupOrderPaymentStatus(paymentStatus)
      if(status === PENDING_ORDER_STATUS){
        action.push(["cancel","Hủy đơn"])
      }
      let orderElementData: OrderElement = {
        orderId: id,
        status: orderStatusLabel,
        paymentStatus: orderPaymentStatusLabel,
        cartItemCost: cartItemCost,
        shippingCost: shippingCost, 
        paymentCost: paymentCost, 
        action: action,
        digitalBillHash: digitalBillHash
      }
      return orderElementData
    })
    this.orderDataSource = new MatTableDataSource(this.orderElementDataList)
  }
  onClickCancelOrder(orderId: number){
    this.orderService.updateStatus(orderId, CANCEL_ORDER_STATUS).subscribe()
    this.orderDataSource.data.find(orderElement => orderElement.orderId === orderId)!.status = "Đã hủy"
    let action: [string, string][] = this.orderDataSource.data.find(orderElement => orderElement.orderId === orderId)!.action
    action = action.filter(action => action[0] !== "cancel")
    action.push(["reorder","Đặt lại"])
    this.orderDataSource.data.find(orderElement => orderElement.orderId === orderId)!.action = action
    this.orderDataSource._updateChangeSubscription()
  }
  onClickShowOrderDetail(orderId: number){
    this.dialog.open(OrderDetailDialog, {
      minWidth: "400px",
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: {
        orderId: orderId
      }
    })
  }
  onClickReorder(orderId: number){
    // if (!this.userService.userBehaviorSubject.value) {
    //   this.router.navigate(['/buyer/login'])
    // } else {
    //   const cartId: number = this.cartService.cartBehaviorSubject.value!.id
    //   const pendingItem: PendingItemRequest = {
    //     productId: this.productId,
    //     quantity: Number.parseInt(quantityTemplateVar.value)
    //   }
    //   this.cartService.flushCart(cartId,pendingItem).subscribe((cartResponse: CartResponse) => {
    //     this.cartService.cartBehaviorSubject.next(cartResponse)
    //     this.dialogService.openDialog('500ms', '50ms', {
    //       title: 'Thêm thành công',
    //       content: 'Đã thêm sản phẩm vào giỏ hàng',
    //       action: [{ path: '/buyer/payment', title: "Thanh toán ngay" },{ path: '/buyer/cart', title: "Xem giỏ hàng" }]
    //     })
    //   })
    // }
    // let summaryCart!: SummaryCart
    // let user = this.userService.userBehaviorSubject.value
    // let cardId = user!.cart.id
    // let summaryCartItems: SummaryCartItem[] = []
    // this.orderService.findByOrderId(orderId).subscribe((orderResponse: OrderResponse) => {
    //   const { orderItems, shopId } = orderResponse
    //   orderItems.forEach((orderItem: OrderItemResponse) => {
    //     let cartItem: CartItemResponse = {

    //     }
    //   })
    // })
  }
}

@Component({
  templateUrl: './order-detail.dialog.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class OrderDetailDialog implements OnInit {
  order$!: Observable<OrderResponse>
  myAngularxQrCode = `2|99|0776425942|HUYNH GIA HUU|huynhgiahuy492@gmail.com|0|0|1000|`;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private orderService: OrderService) { }
  ngOnInit(): void {
    this.order$ = this.orderService.findByOrderId(this.data.orderId)
  }
  countProducts(order: OrderResponse): number{
    let result: number = 0
    order.orderItems.forEach(orderItem => {
      result += orderItem.quantity
    })
    return result
  }
  getTotalPayment(orderResponse: OrderResponse): number{
    let result = 0
    if(orderResponse.paymentMethod === MOMO_PAYMENT_METHOD && orderResponse.paymentStatus === PAID_PAYMENT_STATUS){
      return result
    }else if(orderResponse.paymentMethod === MOMO_PAYMENT_METHOD && orderResponse.paymentStatus === UNPAID_PAYMENT_STATUS){
      return orderResponse.paymentCost
    }else if(orderResponse.paymentMethod === COD_PAYMENT_METHOD && orderResponse.paymentStatus === PAID_PAYMENT_STATUS){
      return result
    }else if(orderResponse.paymentMethod === COD_PAYMENT_METHOD && orderResponse.paymentStatus === UNPAID_PAYMENT_STATUS){
      return orderResponse.paymentCost
    }
    return result = 0
  }
}