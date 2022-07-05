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
      this.orderService.findAllByStatusAndShop(shopId, '3');
    deliveredOrders$.subscribe((deliveredOrders) => {
      for (let index = 0; index < 12; index++) {
        let costByMonth: number = 0;
        let costsByMonth = deliveredOrders
          .filter((deliveredOrder) => {
            let month = new Date(deliveredOrder.createdDate).getMonth();
            return month === index;
          })
          .map((deliveredOrder) => deliveredOrder.cartItemCost);
        costsByMonth.forEach((cost) => {
          console.log(cost);
          
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
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
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
