import { DELIVERED_ORDER_STATUS } from './../../../_models/constance';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { forkJoin, Observable } from 'rxjs';
import { OrderService } from 'src/app/buyer/services/order.service';
import { UserService } from 'src/app/buyer/services/user.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryResponse, OrderItemResponse, OrderResponse } from 'src/app/_models/response';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  category: string[] = [];
  numData: number[] = [];
  month: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  year: number[] = [2021, 2022, 2023];
  map = new Map<string, number>()
  constructor( private orderService: OrderService,
    private userService: UserService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    let user = this.userService.userBehaviorSubject.value;
    let shopId = user!.shop.id;
    let categories$: Observable<CategoryResponse[]> = this.categoryService.findAllByShop(shopId)
    let deliveredOrders$: Observable<OrderResponse[]> =
      this.orderService.findAllByStatusAndShop(shopId, DELIVERED_ORDER_STATUS);
    forkJoin([categories$,deliveredOrders$]).subscribe(([categories,deliveredOrders])=>{
      categories.map(category => {
        let categoryName = category.name
        this.map.set(categoryName, 0)
      })
      let orderItemAll:OrderItemResponse[][] = deliveredOrders.map(deliveredOrder=> {
        return deliveredOrder.orderItems
      })
      orderItemAll.forEach(orderItems => {
        orderItems.forEach(orderItem => {
          const {product, quantity} = orderItem
          const categoryName = product.category.name
          if(this.map.has(categoryName)){
            let valueOfCategory = this.map.get(categoryName)! | 0
            valueOfCategory += product.buyPrice * quantity
            this.map.set(categoryName, valueOfCategory)
          }
        })
      })
      this.map.forEach((v,k) => {
        this.category.push(k)
        this.numData.push(v)
      })
      const config = new Chart("myPieChart",
        {type: 'pie',
                data: {
                  labels: this.category,
                  datasets: [{
                    label: 'My First Dataset',
                    data: this.numData,
                    backgroundColor: [
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(255, 159, 64, 1)',
                      "rgba(247,37,133, 1)",
                      "rgba(233,255,112, 1)",
                      "rgba(173,193,120, 1)",
                      "rgba(34,124,157, 1)",
                      "rgb(221,184,146, 1)",
                    ],
                    hoverOffset: 4
                  }]
                }
        });
       
    })
  }

  computeTotal():number{
    var result = 0;
    this.numData.forEach(vl =>(result+=vl));
    return result;
  }
}
