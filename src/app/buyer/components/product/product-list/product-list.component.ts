import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../product";
import {PostService} from "../../../post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList!: any[];
  page = 1;
  star:any;
  count = 0;
  tableSize = 9;
  public products!: Product[];
  contentCM: any;
  constructor(private route: ActivatedRoute,private productService : PostService) { }

  ngOnInit(): void {
    this.star =[1,2,3,4,5]
    this.getProducts();
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
  public searchProduct(key: string): void {
    console.log(key);
    const results: Product[] = [];
    for (const products of this.products) {
      if (products.name.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(products);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getProducts();
    }
  }

  tabSize(event: number) {
    this.page = event;
  }
}
