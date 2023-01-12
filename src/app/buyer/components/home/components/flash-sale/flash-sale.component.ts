import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.component.html',
  styleUrls: ['./flash-sale.component.scss']
})
export class FlashSaleComponent implements OnInit {
  flashSales: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
