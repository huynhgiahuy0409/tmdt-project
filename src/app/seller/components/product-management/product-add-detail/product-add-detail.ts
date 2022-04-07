import { AbstractControl } from '@angular/forms';
import {
  ProductInfo,
  ProductManagementService,
} from './../product-management.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../buyer/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../../buyer/product';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryService } from '../product-add/category.service';
import { NgIf } from '@angular/common';
export interface DynamicField {
  abstractControl: string;
  type: string;
  name: string;
  label?: string;
  value: any;
  option?: any;
  length?: number;
  element?: string;
}
export interface ProductFieldGroup {
  [key: string]: DynamicField[];
}
export interface FieldGroup {
  fieldName: string;
  label: string;
}
@Component({
  selector: 'seller-product-add-detail',
  templateUrl: './product-add-detail.html',
  styleUrls: ['./product-add-detail.scss'],
})
export class SellerProductAddDetailComponent implements OnInit {
  productFieldsGroup: ProductFieldGroup = {
    productBaseInfo: [
      {
        abstractControl: 'array',
        type: 'file',
        name: 'images',
        label: 'Hình ảnh sản phẩm',
        length: 9,
        value: '',
      },
      {
        abstractControl: 'control',
        type: 'file',
        name: 'video',
        label: 'Video sản phẩm',
        value: '',
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'name',
        label: 'Tên sản phẩm',
        value: '',
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'description',
        label: 'Mô tả sản phẩm',
        element: 'textarea',
        value: '',
      },
    ],
    productDetailInfo: [
      {
        abstractControl: 'control',
        type: 'file',
        name: 'material',
        label: 'Chất liệu',
        value: '',
      },
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'category',
        label: 'Danh mục',
        value: '',
        option: [],
      },
    ],
  };
  fieldGroups: FieldGroup[] = [
    {
      fieldName: 'productBaseInfo',
      label: 'Thông tin cơ bản',
    },
    {
      fieldName: 'productDetailInfo',
      label: 'Thông tin chi tiết',
    },
  ];
  form!: FormGroup;
  productList!: any[];
  page = 1;
  star: any;
  count = 0;
  tableSize = 9;
  public products!: Product[];
  contentCM: any;
  imglist!: any[];
  /* ----- */
  category$!: Observable<ProductInfo>;
  constructor(
    private route: ActivatedRoute,
    private productService: PostService,
    public productManagementService: ProductManagementService,
    private _fb: FormBuilder,
    private _categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    let productGroup: any = {};
    this.fieldGroups.forEach((fieldGroup) => {
      const { fieldName } = fieldGroup;
      this.productFieldsGroup[fieldName].forEach((f) => {
        if (f.name === 'category' || f.name === 'category1') {
          f['value'] =
            this.productManagementService.productInfoCurValue.category;
          if (f['option']) {
            f['option'] = this._categoryService.categories;
          }
        }
      });
      productGroup[fieldName] = this._fb.group(this.buildFormGroup(fieldName));
    });
    this.form = this._fb.group(productGroup);
    this.form.valueChanges.subscribe((v) => {});
    this.category$ = this.productManagementService.category$;
  }
  get productBaseInfo(): FormGroup {
    return this.form.get('productBaseInfo') as FormGroup;
  }
  get productDetailInfo(): FormGroup {
    return this.form.get('productDetailInfo') as FormGroup;
  }
  private buildFormGroup(name: string) {
    let abstractControls: any = {};
    this.productFieldsGroup[name].forEach((f) => {
      if (f.abstractControl == 'control') {
        abstractControls[f.name] = this._fb.control(f.value || '');
      } else if (f.abstractControl == 'array') {
        const arrayLength = f.length || 0;
        let formArray: FormControl[] = [];
        for (let index = 0; index < arrayLength; index++) {
          formArray.push(this._fb.control(f.value || ''));
        }
        abstractControls[f.name] = this._fb.array(formArray);
      }
    });
    return abstractControls;
  }
}
