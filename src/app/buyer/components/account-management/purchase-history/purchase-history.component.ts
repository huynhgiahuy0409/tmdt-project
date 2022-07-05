import { DIRECT_LINK_DIG_BILL } from 'src/app/_models/constance';
import { OrderResponse } from './../../../../_models/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from 'src/app/buyer/services/order.service';
export interface OrderElement {
  orderId: number;
  status: string;
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
  displayedColumns: string[] = ['orderId', 'status', 'cartItemCost', 'shippingCost', 'paymentCost', 'action', 'digitalBillHash'];
  orderDataSource!: MatTableDataSource<OrderElement>;
  orderElementDataList: OrderElement[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.orderDataSource.paginator = this.paginator;
  }
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    let orders: OrderResponse[] = this.activatedRoute.snapshot.data.orderAll
    this.orderElementDataList = orders.map((order: OrderResponse) => {
      const {id, status, cartItemCost, shippingCost, paymentCost, digitalBillHash} = order
      let action: [string, string][] =  [["see","Xem"], ["contact","Liên hệ người bán"]]
      let tempStatus: string = ''
      if(status === "1"){
        tempStatus = "Chờ xác nhận"
        action.push(["cancel","Hủy đơn"])
      }else if(status === "2"){
        tempStatus = "Đang giao"
      }else if(status === "3"){
        tempStatus = "Đã giao"
      }else if(status === "0"){
        tempStatus = "Đã hủy"
      }
      let orderElementData: OrderElement = {
        orderId: id,
        status: tempStatus,
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
    this.orderService.updateStatus(orderId, "0").subscribe()
    this.orderDataSource.data.find(orderElement => orderElement.orderId === orderId)!.status = "Đã hủy"
    this.orderDataSource._updateChangeSubscription()
  }
}
