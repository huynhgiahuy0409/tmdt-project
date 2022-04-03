import { Observable } from 'rxjs';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  CategoryPage,
  ProductManagementService,
} from '../product-management.service';
import { CategoryService } from './category.service';
import { CategoryRequest } from 'src/app/_models/response';
interface categoryList {
  type: string;
  detailType: [string, string[]][];
}
export function notWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let controlVal = control.value;
    if (typeof controlVal === 'number') {
      controlVal = `${controlVal}`;
    }
    let isWhitespace = (controlVal || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { whitespace: 'value is only whitespace' };
  };
}
@Component({
  selector: 'seller-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class SellerProductAddComponent implements OnInit {
  minLength: number = 10;
  maxLength: number = 200;
  categoryList!: categoryList[];
  selectedType!: string;
  selectedDetailType!: string;
  selectedProductName!: string;
  searchForm!: FormGroup;
  categories$!: Observable<CategoryRequest[]>;
  selectedCategory!: string;
  infoProductForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _productManagementService: ProductManagementService,
    private _categoryService: CategoryService
  ) {
    this.categories$ = this._categoryService.findAll();
    this.categoryList = [];
  }

  ngOnInit(): void {
    this.infoProductForm = this.fb.group({
      search: [
        '',
        Validators.compose([
          notWhitespaceValidator(),
          Validators.minLength(this.minLength),
          Validators.maxLength(this.maxLength),
        ]),
      ],
      category: ['', Validators.required],
    });
  }

  selectType(item: categoryList) {
    this.selectedType = item.type;
    this.selectedDetailType = '';
    this.selectedProductName = '';
  }
  selectDetailType(detailType: string) {
    this.selectedDetailType = detailType;
    this.selectedProductName = '';
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
  onSubmit(
    productName: string,
    selectedType: string,
    selectedDetailType: string,
    selectedProductName: string
  ) {
    this._productManagementService.categoryBSub.next({
      productName: productName,
      selectedType: selectedType,
      selectedDetailType: selectedDetailType,
      selectedProductName: selectedProductName,
    });
  }
}
