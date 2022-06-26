import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ShopService } from 'src/app/seller/services/shop.service';
import { ShopResponse } from 'src/app/_models/response';
@Component({
  selector: 'seller-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss'],
})
export class SellerProductAllComponent implements OnInit {
  shop$!: Observable<ShopResponse | null>
  constructor(private shopService: ShopService){}
  ngOnInit(): void {
    this.shop$ = this.shopService.shop$
  }
}
