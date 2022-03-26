import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'seller-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss'],
})
export class SellerProductAllComponent implements OnInit {
  products!: number[];
  ngOnInit(): void {
    this.products = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  }
}
