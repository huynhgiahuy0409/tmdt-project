import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  public products!: any[];
  constructor() { }

  ngOnInit(): void {
  this.products = [0,1,2,3,4,5,6,7]
  }

}
