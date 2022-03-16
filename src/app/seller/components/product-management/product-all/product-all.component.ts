import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seller-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss']
})
export class SellerProductAllComponent implements OnInit {

  products!:any[];
  constructor() { }

  ngOnInit(): void {
    this.products = [1,1,1,1,1,1,1,1,1,1,1,1,1];
  }

}
