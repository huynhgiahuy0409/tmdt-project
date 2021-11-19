import { Component, OnInit } from '@angular/core';
import {Product} from "../../cart/Product";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products!: Product;
  productList!: any[];
  page = 1;
  count = 0;
  tableSize = 12;
  constructor() { }

  ngOnInit(): void {
    this.productList = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  }
  tabSize(event: number) {
    this.page = event;
  }
}
