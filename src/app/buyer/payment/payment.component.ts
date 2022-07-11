import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  MomoTransactionResponse,
  OrderResponse,
} from 'src/app/_models/response';
import { OrderService } from '../services/order.service';
import { MomoService } from '../services/momo.service';
import { DialogService } from '../services/dialog.service';
import {
  PAID_PAYMENT_STATUS,
  PENDING_ORDER_STATUS,
  WAITING_PICK_ORDER_STATUS,
} from 'src/app/_models/constance';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  myAngularxQrCode!: string;
  receipt$!: Observable<OrderResponse[] | null>;
  paymentCost: number = 0;
  contentReceipt: string = '';
  isExistPaymentOrder: boolean = false;
  constructor(
    private orderService: OrderService,
    private momoService: MomoService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.receipt$ = orderService.receipt$;
    this.receipt$.subscribe((orderResponses) => {
      this.paymentCost = 0;
      this.contentReceipt = '';
      orderResponses?.forEach((orderResponse, idx) => {
        if (idx === 0) {
          this.contentReceipt += orderResponse.id;
        } else {
          this.contentReceipt += `/${orderResponse.id}`;
        }
        this.paymentCost += orderResponse.paymentCost;
      });
      // this.myAngularxQrCode = `2|99|0776425942|HUYNH GIA HUU|huynhgiahuy492@gmail.com|0|0|${this.paymentCost}|${this.contentReceipt}`;
      this.myAngularxQrCode = `2|99|0776425942|HUYNH GIA HUU|huynhgiahuy492@gmail.com|0|0|1000|${this.contentReceipt}`;
    });
  }

  ngOnInit(): void {
    let orderResponses: OrderResponse[] = []
    let orderResponse1: OrderResponse = {
      id: 148,
      createdDate: new Date(),
      orderItems: [],
      status: "string",
      shopId: 1,
      sendBy: "string",
      orderBy: "string",
      sendPhoneNumber: "string",
      orderPhoneNumber: "string",
      orderAddress: "string",
      sendAddress: "string",
      cartItemCost: 1,
      shippingCost: 1,
      paymentCost: 1,
      paymentMethod: "string",
      digitBillFilename: "string",
      digitalBillHash: "string",
      paymentStatus: "string",
    }
    let orderResponse2: OrderResponse = {
      id: 149,
      createdDate: new Date(),
      orderItems: [],
      status: "string",
      shopId: 1,
      sendBy: "string",
      orderBy: "string",
      sendPhoneNumber: "string",
      orderPhoneNumber: "string",
      orderAddress: "string",
      sendAddress: "string",
      cartItemCost: 1,
      shippingCost: 1,
      paymentCost: 1,
      paymentMethod: "string",
      digitBillFilename: "string",
      digitalBillHash: "string",
      paymentStatus: "string",
    }
    orderResponses.push(orderResponse1)
    orderResponses.push(orderResponse2)
    this.orderService.receiptBehaviorSubject.next(orderResponses)
  }
  autoClickPayment() {
    this.checkPaymentReceipt();
  }
  checkPaymentReceipt() {
    this.momoService
      .getTransactionHistory()
      .subscribe((transactionHistoryResponse) => {
        const orderResponses: OrderResponse[] | null =
          this.orderService.receiptBehaviorSubject.value;
        let orderIds: number[] = orderResponses!.map(
          (orderResponse) => orderResponse.id
        );
        let transactions: MomoTransactionResponse[] =
          transactionHistoryResponse.transactions;
        let contents: string[] = transactions.map(
          (transaction) => transaction.content
        );
        contents.forEach((content) => {
          let ordersPaymentStatuses: [number, boolean][] = [];
          orderIds.forEach((orderId) => {
            ordersPaymentStatuses.push([
              orderId,
              content.includes(orderId + ''),
            ]);
          });
          const isPaymentRecept: boolean = ordersPaymentStatuses.every(
            (ordersPaymentStatus) => ordersPaymentStatus[1] === true
          );
          if (isPaymentRecept) {
            orderIds.forEach((orderId) => {
              this.orderService
                .updatePaymentStatus(orderId, PAID_PAYMENT_STATUS)
                .subscribe();
            });
            const dialogRef = this.dialogService.openDialog('500ms', '500ms', {
              title: 'Đã xác nhận thanh toán',
              content: 'Hệ thống đã xác nhận. Đơn hàng đã thanh toán',
            });
            dialogRef.afterClosed().subscribe((response) => {
              this.router.navigate([
                '/buyer/account-management/purchase-history',
              ]);
            });
          }
        });
      });
  }
}
