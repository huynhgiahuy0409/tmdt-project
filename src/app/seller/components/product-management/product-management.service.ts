import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { CategoryResponse } from 'src/app/_models/response';
export interface ProductInfo {
  productName: string;
  category: CategoryResponse;
}
@Injectable({
  providedIn: 'root',
})
export class ProductManagementService implements OnInit {
  public categoryBSub: BehaviorSubject<ProductInfo> =
    new BehaviorSubject<ProductInfo>({
      productName: '',
      category: {
        name: '',
        code: ''
      },
    });
  public category$ = this.categoryBSub.asObservable();
  constructor() {}
  ngOnInit(): void {}
  get productInfoCurValue(): ProductInfo {
    return this.categoryBSub.value;
  }
}
