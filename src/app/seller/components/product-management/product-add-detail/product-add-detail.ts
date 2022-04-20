import { AbstractControl } from '@angular/forms';
import {
  ProductInfo,
  ProductManagementService,
} from './../product-management.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../buyer/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../../buyer/product';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryService } from '../product-add/category.service';
import { NgIf } from '@angular/common';
import { BrandServiceService } from './brand-service.service';
import { RecommendAgeService } from './recommend-age.service';
import { MaterialServiceService } from './material-service.service';
export interface DynamicField {
  abstractControl: string;
  type: string;
  name: string;
  label?: string;
  value?: any;
  options?: any[];
  length?: number;
  element?: string;
  placeholder?: string[];
  required: boolean;
  title?: string;
  aPlaceHolder?: string;
  accept?: string;
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
export class SellerProductAddDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('navItem') el!: ElementRef;
  isEndOfPage = false;
  productFieldsGroup: ProductFieldGroup = {
    productBaseInfo: [
      {
        abstractControl: 'array',
        type: 'file',
        name: 'images',
        label: 'Hình ảnh sản phẩm',
        length: 9,
        required: true,
        title: 'Ảnh bìa',
        accept: 'image/*',
      },
      {
        abstractControl: 'control',
        type: 'file',
        name: 'video',
        label: 'Video sản phẩm',
        required: false,
        title: 'Video bìa',
        accept: 'video/*',
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'name',
        label: 'Tên sản phẩm',
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'description',
        label: 'Mô tả sản phẩm',
        element: 'textarea',
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'category',
        label: 'Danh mục',
        options: [],
        required: true,
      },
    ],
    productDetailInfo: [
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'brand',
        label: 'Thương hiệu',
        options: [],
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'material',
        label: 'Chất liệu',
        options: [],
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'recommendAge',
        label: 'Độ tuổi khuyến nghị',
        options: [],
        required: true,
      },
    ],
    salesInfo: [
      {
        abstractControl: 'control',
        type: 'text',
        name: 'warehouse',
        label: 'Kho',
        required: true,
      },
    ],
    transport: [
      {
        abstractControl: 'control',
        type: 'text',
        name: 'weight',
        label: 'Cân nặng (Sau khi đóng gói)',
        required: true,
      },
      /*  */
      {
        abstractControl: 'array',
        type: 'text',
        name: 'size',
        label:
          'Kích thước đóng gói (Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập sai kích thước)',
        length: 3,
        placeholder: ['R', 'D', 'C'],
        required: false,
      },
      /*  {
        abstractControl: 'control',
        type: 'expansionPanel',
        name: 'ship',
        label: 'Phí vận chuyển',
      }, */
    ],
    diffInfo: [
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'status',
        label: 'Tình trạng',
        options: ['Mới', 'Đã sử dụng'],
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'SKU',
        label: 'SKU sản phẩm',
        required: false,
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
    {
      fieldName: 'salesInfo',
      label: 'Thông tin kho',
    },
    {
      fieldName: 'transport',
      label: 'Vận chuyển',
    },
    {
      fieldName: 'diffInfo',
      label: 'Thông tin khác',
    },
  ];
  form!: FormGroup;
  /* ----- */
  category$!: Observable<ProductInfo>;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private productService: PostService,
    public productManagementService: ProductManagementService,
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _brandService: BrandServiceService,
    private __recommendAgeService: RecommendAgeService,
    private __materialService: MaterialServiceService
  ) {}
  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
  ngOnInit(): void {
    /* if (!this.productManagementService.productInfoCurValue.category) {
      this.router.navigate(['/seller/product-management/category']);
    } */
    let productGroup: any = {};
    this.fieldGroups.forEach((fieldGroup) => {
      const { fieldName } = fieldGroup;
      this.productFieldsGroup[fieldName].forEach((f) => {
        if (f.name === 'category') {
          f['value'] =
            this.productManagementService.productInfoCurValue.category;
        }
        if (f.name === 'name') {
          f['value'] =
            this.productManagementService.productInfoCurValue.productName;
        }
        if (f.options) {
          if (f.name == 'category') {
            this._categoryService.findAll().subscribe((v) => {
              f['options'] = this.setUpOptions(v, 'name');
            });
          } else if (f.name == 'brand') {
            this._brandService.findAll().subscribe((v) => {
              f['options'] = this.setUpOptions(v, 'name');
            });
          } else if (f.name == 'recommendAge') {
            this.__recommendAgeService.findAll().subscribe((v) => {
              f['options'] = this.setUpOptions(v, 'code');
            });
          } else if (f.name == 'material') {
            this.__materialService.findAll().subscribe((v) => {
              f['options'] = this.setUpOptions(v, 'name');
            });
          }
        }
      });
      productGroup[fieldName] = this._fb.group(this.buildFormGroup(fieldName));
    });
    this.form = this._fb.group(productGroup);
    this.category$ = this.productManagementService.category$;
  }

  get productBaseInfo(): FormGroup {
    return this.form.get('productBaseInfo') as FormGroup;
  }
  get productDetailInfo(): FormGroup {
    return this.form.get('productDetailInfo') as FormGroup;
  }
  private setUpOptions(list: any[], fieldName: string): string[] {
    return list.map((i) => {
      return i[fieldName];
    });
  }
  private buildFormGroup(name: string) {
    let abstractControls: any = {};
    this.productFieldsGroup[name].forEach((f) => {
      if (f.abstractControl == 'control') {
        if (f.required) {
          abstractControls[f.name] = this._fb.control(
            f.value || '',
            Validators.required
          );
        } else {
          abstractControls[f.name] = this._fb.control(f.value || '');
        }
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
  scrollTo(id: string, navUl: HTMLElement): void {
    navUl.tabIndex == 0;
    const element = document.getElementById(id);
    element!.scrollIntoView({ behavior: 'smooth' });
  }
  @HostListener('window:scroll', ['$event'])
  checkEndOfPage() {
    //In chrome and some browser scroll is given to body tag
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    let actualPos = Math.round(pos);
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    const fixedContainer = document.getElementById('fixed-container');
    if (actualPos == max) {
      this.isEndOfPage = true;
    }
    if (actualPos + 20 < max && this.isEndOfPage) {
      //Do your action here
      fixedContainer?.classList.add('fixed-bottom');
    } else {
      fixedContainer?.classList.remove('fixed-bottom');
    }
  }
  onSubmit() {}
}
