import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  ProductInfo,
  ProductManagementService,
} from '../product-management.service';
import { CategoryResponse } from 'src/app/_models/response';
import { tap } from 'rxjs/operators';
import { CategoryService } from 'src/app/shared/services/category.service';
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
  baseProductInfoForm!: FormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private productManagementService: ProductManagementService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.findAll();
    this.baseProductInfoForm = this.fb.group({
      productName: [
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
    console.log(this.baseProductInfoForm.value)
    this.productManagementService.categoryBSub.next(this.baseProductInfoForm.value);
    this.router.navigate(['/seller/product-management/add-detail']);
  }
}
