import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  productName: string;
  thumbnail: string;
  SKU: string;
  category: string;
  price: number;
  warehouse: number;
  sales: number;
  edit: [string, string];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    productName: 'Máy bay',
    thumbnail: 'IMG.img',
    SKU: 'MB199',
    category: 'Đồ chơi trẻ em',
    price: 200000,
    warehouse: 10,
    sales: 100,
    edit: ['Sửa', 'Xem thêm'],
  },
  {
    productName: 'Máy bay 1',
    thumbnail: 'IMG.img',
    SKU: 'MB199',
    category: 'Đồ chơi trẻ em',
    price: 200000,
    warehouse: 10,
    sales: 100,
    edit: ['Sửa', 'Xem thêm'],
  },
];
@Component({
  selector: 'seller-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss'],
})
export class SellerProductAllComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'thumbnail',
    'productName',
    'SKU',
    'category',
    'price',
    'warehouse',
    'sales',
    'edit',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  /* Prepare constructor for SelectionModel Object */
  allowMultiSelect = true;
  initialSelection: PeriodicElement[] = [];
  selection = new SelectionModel<PeriodicElement>(
    this.allowMultiSelect,
    this.initialSelection
  );
  products!: any[];
  constructor() {
    this.selection.changed.subscribe((v) => {
      console.log(v), console.log(this.selection.selected.length);
    });
  }
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
  ngOnInit(): void {
    this.products = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  }
}
