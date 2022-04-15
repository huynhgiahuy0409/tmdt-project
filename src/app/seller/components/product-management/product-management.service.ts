import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
export interface ProductInfo {
  productName: string;
  category: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProductManagementService implements OnInit {
  public categoryBSub: BehaviorSubject<ProductInfo> =
    new BehaviorSubject<ProductInfo>({
      productName: '',
      category: '',
    });
  public category$ = this.categoryBSub.asObservable();
  constructor() {}
  ngOnInit(): void {}
  get productInfoCurValue(): ProductInfo {
    return this.categoryBSub.value;
  }
}
