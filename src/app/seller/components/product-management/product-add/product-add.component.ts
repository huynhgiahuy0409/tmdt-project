import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  ProductInfo,
  ProductManagementService,
} from '../product-management.service';
import { CategoryService } from './category.service';
import { CategoryResponse } from 'src/app/_models/response';
import { tap } from 'rxjs/operators';
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
  categories$!: Observable<CategoryResponse[]>;
  selectedCategory!: string;
  baseProductInfoForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private _productManagementService: ProductManagementService,
    private _categoryService: CategoryService,
    private _router: Router
  ) {
    this.categories$ = this._categoryService.findAll().pipe(
      tap((c) => {
        this._categoryService.categories = c;
      })
    );
  }

  ngOnInit(): void {
    this.baseProductInfoForm = this.fb.group({
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

  onSubmit() {
    this._productManagementService.categoryBSub.next({
      productName: this.baseProductInfoForm.get('search')!.value,
      category: this.baseProductInfoForm.get('category')!.value,
    });
    this._router.navigate(['/seller/product-management/add-detail']);
  }
}
