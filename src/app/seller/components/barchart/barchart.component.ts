import { DELIVERED_ORDER_STATUS } from './../../../_models/constance';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import {
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  registerables,
} from 'chart.js';
import { OrderService } from 'src/app/buyer/services/order.service';
import { UserService } from 'src/app/buyer/services/user.service';
import { OrderResponse } from 'src/app/_models/response';
Chart.register(LinearScale, BarElement, BarController, CategoryScale);

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent implements OnInit {
  options: string[] = ['Year', 'Month', 'Week', 'Day in week'];
  monthLabels: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'September',
    'October',
    'November',
    'December',
  ];
  numData: number[] = [];
  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    let user = this.userService.userBehaviorSubject.value;
    let shopId = user!.shop.id;
    let deliveredOrders$: Observable<OrderResponse[]> =
      this.orderService.findAllByStatusAndShop(shopId, DELIVERED_ORDER_STATUS);
    console.log(shopId);
    
    deliveredOrders$.subscribe((deliveredOrders) => {
      for (let index = 0; index < 12; index++) {
        let costByMonth: number = 0;
        let costsByMonth = deliveredOrders
          .filter((deliveredOrder) => {
            let month = new Date(deliveredOrder.createdDate).getMonth();
            console.log(month);
            
            return month === index;
          })
          .map((deliveredOrder) => deliveredOrder.cartItemCost);
        costsByMonth.forEach((cost) => {
          costByMonth += cost;
        });
        this.numData.push(costByMonth)
      }
      const myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: this.monthLabels,
          datasets: [
            {
              label: 'Total of revenue is: ' + this.computeTotal(),
              data: this.numData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                "rgba(247,37,133, 0.2)",
                "rgba(52,58,64, 0.2)",
                "rgba(173,193,120, 0.2)",
                "rgba(221,184,146, 0.2)",
                "rgba(34,124,157, 0.2)",
                "rgba(233,255,112, 0.2)"
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                "rgba(247,37,133, 1)",
                "rgb(52,58,64, 1)",
                "rgba(173,193,120, 1)",
                "rgb(221,184,146, 1)",
                "rgba(34,124,157, 1)",
                "rgba(233,255,112, 1)"
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }

  computeTotal(): number {
    var result = 0;
    this.numData.forEach((vl) => (result += vl));
    return result;
  }
}
