import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../product";
import {PostService} from "../../../post.service";
import {ActivatedRoute} from "@angular/router";
import { ProductResponse } from 'src/app/_models/response';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/buyer/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  product$!: Observable<ProductResponse[]>
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.product$ = this.productService.findAll()
  }
 
}
