import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
interface categoryList {
  type: string;
  detailType: [string, string[]][];
}
@Component({
  selector: 'seller-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class SellerProductAddComponent implements OnInit {
  productNameValue: string = '';
  categoryList!: categoryList[];
  selectedType!: string | null;
  selectedDetailType!: string | null;
  selectedProductName!: string | null;
  searchForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.categoryList = [
      {
        type: 'Thời Trang Nữ',
        detailType: [
          ['Áo', ['Áo hai dây và ba lỗ', 'Áo ông', 'Áo thun', 'Khác']],
          ['Quần', ['Quần legging', 'Quần dài', 'Khác']],
          ['Sắc đẹp', ['Chăm sóc tay, chân & móng ', 'Chăm sóc tóc', 'Khác']],
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: '',
    });
  }
  selectType(item: categoryList) {
    this.selectedType = item.type;
    this.selectedDetailType = null;
    this.selectedProductName = null;
  }
  selectDetailType(detailType: string) {
    this.selectedDetailType = detailType;
    this.selectedProductName = null;
  }
  selectProductName(productName: string) {
    this.selectedProductName = productName;
  }
  getDetailType(selectedType: string) {
    let result: [string, string[]][] | null = null;
    this.categoryList.forEach((e) => {
      if (e.type === selectedType) {
        result = e.detailType;
      }
    });
    return result;
  }
  getProductName(detailType: string) {
    let result!: string[];
    this.categoryList.forEach((e) => {
      if (e.type === this.selectedType) {
        e.detailType.forEach((e) => {
          if (e[0] == detailType) {
            result = e[1];
          }
        });
      }
    });
    return result;
  }
}
