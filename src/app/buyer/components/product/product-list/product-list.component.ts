import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../product";
import {ProductService} from "../../../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList!: any[];
  page = 1;
  count = 0;
  tableSize = 12;
  private productService!: ProductService;
  public products!: Product[];
  constructor(){}

  ngOnInit(): void {
    this.getProducts();
    // this.productList = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  tabSize(event: number) {
    this.page = event;
  }
}
