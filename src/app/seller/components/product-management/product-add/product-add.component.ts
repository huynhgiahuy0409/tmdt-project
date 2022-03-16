import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seller-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class SellerProductAddComponent implements OnInit {

  products!:any[];
  constructor() { }

  ngOnInit(): void {
    this.products = [1,1,1,1,1,1,1,1,1,1,1,1,1];
  }

}
