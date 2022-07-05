import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse, ShopResponse } from 'src/app/_models/response';
import { ShopService } from 'src/app/seller/services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DIRECT_LINK_IMAGE } from 'src/app/_models/constance';
export interface PeriodicElement {
  productName: string;
  thumbnail: string;
  SKU: string;
  category: string;
  price: number;
  warehouse: number;
  edit: [string, string];
}

@Component({
  selector: 'app-product-list-section',
  templateUrl: './product-list-section.component.html',
  styleUrls: ['./product-list-section.component.scss'],
})
export class ProductListSectionComponent implements OnInit {
  directLinkImage = `${DIRECT_LINK_IMAGE}/`
  displayedColumns: string[] = [
    'select',
    'thumbnail',
    'productName',
    'SKU',
    'category',
    'price',
    'warehouse',
    'edit',
  ];
  shop$!: Observable<ShopResponse>;
  dataSource!: MatTableDataSource<PeriodicElement>;
  elementDataProducts: PeriodicElement[] = [];
  /* Prepare constructor for SelectionModel Object */
  allowMultiSelect = true;
  initialSelection: PeriodicElement[] = [];
  selection = new SelectionModel<PeriodicElement>(
    this.allowMultiSelect,
    this.initialSelection
  );
  products!: any[];
  constructor(private shopService: ShopService, private route: ActivatedRoute) {
    let shop: ShopResponse | null = route.snapshot.data.shop;
    let products: ProductResponse[] = shop!.products;
    products.forEach((product) => {
      console.log(product.images);
      const { images, name, sku, category, buyPrice, repository } = product;
      let thumbnail = images[0]?.url ? images[0].url : '';
      let elementDataProduct: PeriodicElement = {
        thumbnail: thumbnail,
        SKU: sku,
        category: category.name,
        productName: name,
        price: buyPrice,
        warehouse: repository,
        edit: ['Sửa', 'Xem'],
      };
      this.elementDataProducts.push(elementDataProduct);
    });
    this.dataSource = new MatTableDataSource(this.elementDataProducts);
    this.selection.changed.subscribe((v) => {
      console.log(v), console.log(this.selection.selected.length);
    });
  }
  ngOnInit(): void {}
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      console.log(this.isAllSelected());
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${+1}`;
  }
  edit() {}
  seeMore() {}
}
