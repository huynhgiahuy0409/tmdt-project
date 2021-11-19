import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  category: string[] = ['Robot', 'Doll', 'Cart'];
  numData: number[] = [300, 50, 100];
  month: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  year: number[] = [2021, 2022, 2023];

  constructor() { }

  ngOnInit(): void {
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
  }

  computeTotal():number{
    var result = 0;
    this.numData.forEach(vl =>(result+=vl));
    return result;
  }
}
