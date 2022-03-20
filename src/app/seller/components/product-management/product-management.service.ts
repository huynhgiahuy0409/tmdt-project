import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
export interface CategoryPage {
  productName: string;
  selectedType: string;
  selectedDetailType: string;
  selectedProductName: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProductManagementService implements OnInit {
  public categoryBSub: BehaviorSubject<CategoryPage> =
    new BehaviorSubject<CategoryPage>({
      productName: '',
      selectedType: '',
      selectedDetailType: '',
      selectedProductName: '',
    });
  public category$ = this.categoryBSub.asObservable();
  constructor() {}
  ngOnInit(): void {}
}
