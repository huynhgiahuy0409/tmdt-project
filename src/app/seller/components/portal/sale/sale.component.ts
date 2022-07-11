import { CANCEL_ORDER_STATUS, DELIVERED_ORDER_STATUS } from './../../../../_models/constance';
import { UserService } from 'src/app/buyer/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/_models/response';
import { OrderService } from 'src/app/buyer/services/order.service';
import { PENDING_ORDER_STATUS, SHIPPING_ORDER_STATUS, WAITING_PICK_ORDER_STATUS } from 'src/app/_models/constance';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  waitProcessOrders!: OrderResponse[]
  waitingPickOrders!: OrderResponse[]
  deliveringOrders!: OrderResponse[]
  deliveredOrders!: OrderResponse[]
  allOrders!: OrderResponse[]
  cancelledOrders!: OrderResponse[]

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    let orders: OrderResponse[] = this.activatedRoute.snapshot.data.orders
    this.allOrders = orders
    this.waitProcessOrders = orders.filter(order => order.status === PENDING_ORDER_STATUS)
    this.waitingPickOrders = orders.filter(order => order.status === WAITING_PICK_ORDER_STATUS)
    this.deliveringOrders = orders.filter(order => order.status === SHIPPING_ORDER_STATUS)
    this.deliveredOrders = orders.filter(order => order.status === DELIVERED_ORDER_STATUS)
    this.cancelledOrders = orders.filter(order => order.status === CANCEL_ORDER_STATUS)
  }

}
