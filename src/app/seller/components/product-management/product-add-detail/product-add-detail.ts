import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
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
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../buyer/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { NgIf } from '@angular/common';
import { BrandServiceService } from './brand-service.service';
import { RecommendAgeService } from './recommend-age.service';
import { MaterialServiceService } from './material-service.service';
import { CategoryService } from 'src/app/seller/services/category.service';
import { Product, ProductRequest, Size } from 'src/app/_models/request';
import { OriginService } from 'src/app/seller/services/origin.service';
import { StatusService } from 'src/app/seller/services/status.service';
import { ProductService } from 'src/app/seller/services/product.service';
import { switchMap } from 'rxjs/operators';
import { FileUploadService } from 'src/app/seller/services/file-upload.service';
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
export interface FormGroupName {
  formGroupName: string;
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
  productFieldGroup: ProductFieldGroup = {
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
        value: '',
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
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'origin',
        label: 'Xuất xứ',
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
      {
        abstractControl: 'control',
        type: 'text',
        name: 'price',
        label: "Giá",
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'discount',
        label: "Giảm giá",
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
        required: true,
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
        options: [],
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
  formGroupNames: FormGroupName[] = [
    {
      formGroupName: 'productBaseInfo',
      label: 'Thông tin cơ bản',
    },
    {
      formGroupName: 'productDetailInfo',
      label: 'Thông tin chi tiết',
    },
    {
      formGroupName: 'salesInfo',
      label: 'Thông tin bán hàng',
    },
    {
      formGroupName: 'transport',
      label: 'Vận chuyển',
    },
    {
      formGroupName: 'diffInfo',
      label: 'Thông tin khác',
    },
  ];
  form!: FormGroup;
  /* ----- */
  category$!: Observable<ProductInfo>;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public productManagementService: ProductManagementService,
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private brandService: BrandServiceService,
    private recommendAgeService: RecommendAgeService,
    private materialService: MaterialServiceService,
    private originService: OriginService,
    private statusService: StatusService,
    private productService: ProductService,
    private fileUploadService: FileUploadService
  ) {}
  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
  ngOnInit(): void {
    console.log(this.productManagementService.productInfoCurValue);
    let productForm: any = {};
    this.formGroupNames.forEach((item) => {
      const { formGroupName } = item;
      this.productFieldGroup[formGroupName].forEach((field) => {
        const nameControl = field.name;
        if (nameControl === 'category') {
          field['value'] =
            this.productManagementService.productInfoCurValue.category;
        }
        if (nameControl === 'name') {
          field['value'] =
            this.productManagementService.productInfoCurValue.productName;
        }
        const type = field.type;
        if (type === 'dropdown') {
          if (nameControl == 'category') {
            this.categoryService.findAll().subscribe((v) => {
              field['options'] = v;
            });
          } else if (nameControl == 'brand') {
            this.brandService.findAll().subscribe((v) => {
              field['options'] = v;
            });
          } else if (nameControl == 'recommendAge') {
            this.recommendAgeService.findAll().subscribe((v) => {
              field['options'] = v;
            });
          } else if (nameControl == 'material') {
            this.materialService.findAll().subscribe((v) => {
              field['options'] = v;
            });
          } else if (nameControl == 'origin') {
            this.originService.findAll().subscribe((v) => {
              field['options'] = v;
            });
          } else if (nameControl == 'status') {
            this.statusService.findAll().subscribe((v) => {
              field['options'] = v;
            });
          }
        }
      });
      productForm[formGroupName] = this.fb.group(
        this.buildFieldGroup(formGroupName)
      );
    });
    this.form = this.fb.group(productForm);
    this.form.valueChanges.subscribe((v) => {
      console.log(v);
    });
  }

  get productBaseInfo(): UntypedFormGroup {
    return this.form.get('productBaseInfo') as UntypedFormGroup;
  }
  get productDetailInfo(): UntypedFormGroup {
    return this.form.get('productDetailInfo') as UntypedFormGroup;
  }
  private buildFieldGroup(name: string) {
    let fieldGroup: any = {};
    this.productFieldGroup[name].forEach((f) => {
      if (f.abstractControl == 'control') {
        fieldGroup[f.name] = f.required
          ? this.fb.control(f.value || '', Validators.required)
          : this.fb.control(f.value || '');
      } else if (f.abstractControl == 'array') {
        const arrayLength = f.length || 0;
        let formArray: FormControl[] = [];
        for (let index = 0; index < arrayLength; index++) {
          if (f.name === 'images') {
            index == 0
              ? formArray.push(this.fb.control(null, Validators.required))
              : formArray.push(this.fb.control(null));
          } else {
            formArray.push(this.fb.control(null, Validators.required));
          }
        }
        fieldGroup[f.name] = this.fb.array(formArray);
      }
    });
    return fieldGroup;
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
  onSubmit() {
    const {
      productBaseInfo,
      productDetailInfo,
      salesInfo,
      transport,
      diffInfo,
    } = this.form.value;
    let size: Size = {
      weight: transport.weight,
      width: transport.size[0],
      length: transport.size[1],
      height: transport.size[2],
    };
    let product: Product = {
      name: productBaseInfo.name,
      SKU: diffInfo.SKU,
      description: productBaseInfo.description,
      sourcePrice: salesInfo.price,
      discountPercent: salesInfo.discount,
      repository: salesInfo.warehouse,
      size: size,
      originCode: productDetailInfo.origin,
      statusCode: diffInfo.status,
      categoryCode: productBaseInfo.category,
      materialCode: productDetailInfo.material,
      brandCode: productDetailInfo.brand,
      recommendAgeCode: productDetailInfo.recommendAge,
    };
    this.productService
      .addProduct(product)
      .pipe(
        switchMap((productId) => {
          return this.fileUploadService.addProductImages(productId);
        })
      )
      .subscribe();
  }
}
