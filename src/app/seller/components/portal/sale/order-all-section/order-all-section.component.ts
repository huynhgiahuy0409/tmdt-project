import { DIRECT_LINK_DIG_BILL } from './../../../../../_models/constance';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrderElement } from 'src/app/buyer/components/account-management/purchase-history/purchase-history.component';
import { OrderService } from 'src/app/buyer/services/order.service';
import { OrderResponse } from 'src/app/_models/response';
import { FileUploadService } from 'src/app/seller/services/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
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
        cartItemCost,
        shippingCost,
        paymentCost,
        digitBillFilename,
      } = order;
      let action: [string, string][] = [['see', 'Xem']];
      let tempStatus: string = '';
      if (status === '1') {
        tempStatus = 'Chờ xác nhận';
        action.push(['accept', 'Xác nhận']);
      } else if (status === '2') {
        tempStatus = 'Đang giao';
      } else if (status === '3') {
        tempStatus = 'Đã giao';
      } else if (status === '0') {
        tempStatus = 'Đã hủy';
      }
      let orderElementData: OrderElement = {
        orderId: id,
        status: tempStatus,
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
    this.orderService.updateStatus(orderId, '2').subscribe();
    let findOrderElement: OrderElement | undefined =
      this.orderDataSource.data.find(
        (orderElement) => orderElement.orderId === orderId
      );
    findOrderElement!.status = 'Đang giao';
    findOrderElement!.action = [['see', 'Xem']];
    this.orderDataSource._updateChangeSubscription();
  }
  downloadFile(digitalBillFileName: string) {
    this.fileUploadService.downloadFile(digitalBillFileName).subscribe(blob => {
      let a = this.renderer2.createElement('a')
      this.renderer2.setAttribute(a,'href',  window.URL.createObjectURL(blob))
      this.renderer2.setAttribute(a,'download',digitalBillFileName)
      a.click()
    })
  }
}
