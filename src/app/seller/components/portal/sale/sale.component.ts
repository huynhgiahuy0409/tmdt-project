import { UserService } from 'src/app/buyer/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/_models/response';
import { OrderService } from 'src/app/buyer/services/order.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  waitProcessOrders!: OrderResponse[]
  deliveringOrders!: OrderResponse[]
  deliveredOrders!: OrderResponse[]
  allOrders!: OrderResponse[]
  cancelledOrders!: OrderResponse[]

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    let orders: OrderResponse[] = this.activatedRoute.snapshot.data.orders
    this.allOrders = orders
    this.waitProcessOrders = orders.filter(order => order.status === "1")
    this.deliveringOrders = orders.filter(order => order.status === "2")
    this.deliveredOrders = orders.filter(order => order.status === "3")
    this.cancelledOrders = orders.filter(order => order.status === "0")

  }

}
