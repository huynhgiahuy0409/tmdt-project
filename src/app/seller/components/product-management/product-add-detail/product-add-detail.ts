import { DialogService } from 'src/app/buyer/services/dialog.service';
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
import { RecommendAgeService } from '../../../../shared/services/recommend-age.service';
import { MaterialServiceService } from './material-service.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Product, ProductRequest, Size } from 'src/app/_models/request';
import { OriginService } from 'src/app/seller/services/origin.service';
import { StatusService } from 'src/app/seller/services/status.service';
import { ProductService } from 'src/app/seller/services/product.service';
import { switchMap } from 'rxjs/operators';
import { FileUploadService } from 'src/app/seller/services/file-upload.service';
import { BrandService } from 'src/app/shared/services/brand.service';
import { UserService } from 'src/app/buyer/services/user.service';
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
        label: 'H??nh ???nh s???n ph???m',
        length: 9,
        required: true,
        title: '???nh b??a',
        accept: 'image/*',
      },
      {
        abstractControl: 'control',
        type: 'file',
        name: 'video',
        label: 'Video s???n ph???m',
        required: false,
        title: 'Video b??a',
        accept: 'video/*',
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'name',
        label: 'T??n s???n ph???m',
        required: true,
        value: '',
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'description',
        label: 'M?? t??? s???n ph???m',
        element: 'textarea',
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'category',
        label: 'Danh m???c',
        options: [],
        required: true,
      },
    ],
    productDetailInfo: [
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'brand',
        label: 'Th????ng hi???u',
        options: [],
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'material',
        label: 'Ch???t li???u',
        options: [],
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'recommendAge',
        label: '????? tu???i khuy???n ngh???',
        options: [],
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'origin',
        label: 'Xu???t x???',
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
        label: "Gi??",
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'discount',
        label: "Gi???m gi??",
        required: true,
      },
    ],
    transport: [
      {
        abstractControl: 'control',
        type: 'text',
        name: 'weight',
        label: 'C??n n???ng (Sau khi ????ng g??i)',
        required: true,
      },
      /*  */
      {
        abstractControl: 'array',
        type: 'text',
        name: 'size',
        label:
          'K??ch th?????c ????ng g??i (Ph?? v???n chuy???n th???c t??? s??? thay ?????i n???u b???n nh???p sai k??ch th?????c)',
        length: 3,
        placeholder: ['R', 'D', 'C'],
        required: true,
      },
      /*  {
        abstractControl: 'control',
        type: 'expansionPanel',
        name: 'ship',
        label: 'Ph?? v???n chuy???n',
      }, */
    ],
    diffInfo: [
      {
        abstractControl: 'control',
        type: 'dropdown',
        name: 'status',
        label: 'T??nh tr???ng',
        options: [],
        required: true,
      },
      {
        abstractControl: 'control',
        type: 'text',
        name: 'SKU',
        label: 'SKU s???n ph???m',
        required: false,
      },
    ],
  };
  formGroupNames: FormGroupName[] = [
    {
      formGroupName: 'productBaseInfo',
      label: 'Th??ng tin c?? b???n',
    },
    {
      formGroupName: 'productDetailInfo',
      label: 'Th??ng tin chi ti???t',
    },
    {
      formGroupName: 'salesInfo',
      label: 'Th??ng tin b??n h??ng',
    },
    {
      formGroupName: 'transport',
      label: 'V???n chuy???n',
    },
    {
      formGroupName: 'diffInfo',
      label: 'Th??ng tin kh??c',
    },
  ];
  form!: FormGroup;
  /* ----- */
  category$!: Observable<ProductInfo>;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public productManagementService: ProductManagementService,
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private recommendAgeService: RecommendAgeService,
    private materialService: MaterialServiceService,
    private originService: OriginService,
    private statusService: StatusService,
    private productService: ProductService,
    private fileUploadService: FileUploadService,
    private dialogService: DialogService
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
      .addProduct(product, this.userService.userBehaviorSubject.value!.id)
      .pipe(
        switchMap((productId) => {
          return this.fileUploadService.addProductImages(productId);
        })
      )
      .subscribe(response => {
        let dialogRef = this.dialogService.openDialog("500ms", "500ms", {
          title: "Th??nh c??ng",
          content: "S???n ph???m ???? ???????c th??m"
        })
        dialogRef.afterClosed().subscribe(rs => {
          this.router.navigate(['/seller/portal/product'])
        })
      });
  }
}
