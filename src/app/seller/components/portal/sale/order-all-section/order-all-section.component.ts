import {
  DELIVERED_ORDER_STATUS,
  DIRECT_LINK_DIG_BILL,
  PAID_PAYMENT_STATUS,
  PENDING_ORDER_STATUS,
  SHIPPING_ORDER_STATUS,
  UNPAID_PAYMENT_STATUS,
  WAITING_PICK_ORDER_STATUS,
} from './../../../../../_models/constance';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderElement } from 'src/app/buyer/components/account-management/purchase-history/purchase-history.component';
import { OrderService } from 'src/app/buyer/services/order.service';
import { OrderResponse } from 'src/app/_models/response';
import { FileUploadService } from 'src/app/seller/services/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-order-all-section',
  templateUrl: './order-all-section.component.html',
  styleUrls: ['./order-all-section.component.scss'],
})
export class OrderAllSectionComponent implements OnInit {
  directLinkDigitalBill = `${DIRECT_LINK_DIG_BILL}/`;
  @Input()
  orders!: OrderResponse[];
  displayedColumns: string[] = [
    'orderId',
    'status',
    'paymentStatus',
    'cartItemCost',
    'shippingCost',
    'paymentCost',
    'action',
    'digitalBill',
  ];
  orderDataSource!: MatTableDataSource<OrderElement>;
  orderElementDataList: OrderElement[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private fileUploadService: FileUploadService,
    private renderer2: Renderer2,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.orderDataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.orderElementDataList = this.orders.map((order: OrderResponse) => {
      const {
        id,
        status,
        paymentStatus,
        cartItemCost,
        shippingCost,
        paymentCost,
        digitalBillHash,
        digitBillFilename
      } = order;
      let action: [string, string][] = [['see', 'Xem']];
      let orderStatusLabel = this.orderService.setupOrderStatus(status);
      let orderPaymentStatusLabel =
        this.orderService.setupOrderPaymentStatus(paymentStatus);
      if (status === PENDING_ORDER_STATUS) {
        action.push(['accept', 'Xác nhận đơn']);
      }else if(status === WAITING_PICK_ORDER_STATUS) {
        action.push(['shipping', 'Xác nhận hàng đang giao']);
      }else if(status === DELIVERED_ORDER_STATUS && paymentStatus === UNPAID_PAYMENT_STATUS) {
        action.push(['completed-order', 'Xác nhận hoàn thành đơn']);
      }
      let orderElementData: OrderElement = {
        orderId: id,
        status: orderStatusLabel,
        paymentStatus: orderPaymentStatusLabel,
        cartItemCost: cartItemCost,
        shippingCost: shippingCost,
        paymentCost: paymentCost,
        action: action,
        digitalBill: digitBillFilename,
      };
      return orderElementData;
    });
    this.orderDataSource = new MatTableDataSource(this.orderElementDataList);
  }
  onClickAcceptOrder(orderId: number) {
    this.orderService
      .updateStatus(orderId, WAITING_PICK_ORDER_STATUS)
      .subscribe();
    this.router.navigate(['/seller'])
  }
  onClickShippingOrder(orderId: number) {
    this.orderService
      .updateStatus(orderId, SHIPPING_ORDER_STATUS)
      .subscribe();
    this.router.navigate(['/seller'])
  }
  onClickCompletedOrder(orderId: number) {
    this.orderService
      .updateStatus(orderId, DELIVERED_ORDER_STATUS)
      .subscribe();
    this.orderService.updatePaymentStatus(orderId, PAID_PAYMENT_STATUS).subscribe()
    this.router.navigate(['/seller'])
  }
  
  downloadFile(digitalBillFileName: string) {
    this.fileUploadService
      .downloadFile(digitalBillFileName)
      .subscribe((blob) => {
        let a = this.renderer2.createElement('a');
        this.renderer2.setAttribute(
          a,
          'href',
          window.URL.createObjectURL(blob)
        );
        this.renderer2.setAttribute(a, 'download', digitalBillFileName);
        a.click();
      });
  }
}
