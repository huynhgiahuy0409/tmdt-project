import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {BarController, BarElement, CategoryScale, LinearScale, registerables} from "chart.js";
Chart.register(LinearScale, BarElement, BarController, CategoryScale);

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],

})
export class BarchartComponent implements OnInit {
  options: string[] = ['Year', 'Month', 'Week', 'Day in week']
  time: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug'];
  numData: number[] = [12, 19, 3, 5, 2, 3, 39, 8];
  constructor() { }
  ngOnInit(): void {

    function changeCbState(id: string){
    }
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.time,
        datasets: [{
          label: 'Total of revenue is: '+ this.computeTotal(),
          data: this.numData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  computeTotal():number{
    var result = 0;
    this.numData.forEach(vl =>(result+=vl));
    return result;
  }
}
