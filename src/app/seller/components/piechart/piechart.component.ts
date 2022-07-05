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
      this.orderService.findAllByStatusAndShop(shopId, '3');
    forkJoin([categories$,deliveredOrders$]).subscribe(([categories,deliveredOrders])=>{
      let categoryNames = categories.map(category => {
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
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)'
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
