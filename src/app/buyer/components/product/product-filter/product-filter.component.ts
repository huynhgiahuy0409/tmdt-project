import { map } from 'rxjs/operators';
import { max, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BrandResponse,
  CategoryResponse,
  ProductResponse,
  RecommendAgeResponse,
} from 'src/app/_models/response';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { ProductFilterChainService } from 'src/app/buyer/services/product-filter-chain.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { MatSliderChange } from '@angular/material/slider';
export interface Controls {
  [key: string]: any;
}
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  configureSlider = {
    max: 100,
    min: 0,
    vertical: false,
    thumbLabel: true,
    step: 1,
    value: 0,
  };
  @Input()
  products$!: Observable<ProductResponse[]>;
  categories!: CategoryResponse[];
  brands!: BrandResponse[];
  recommendAges!: RecommendAgeResponse[]
  categoryForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productFilterChainService: ProductFilterChainService,
    private spinnerService: SpinnerService,
    private fb: FormBuilder
  ) {
    this.categories = this.route.snapshot.data.categories;
    this.brands = this.route.snapshot.data.brands;
    this.recommendAges = this.route.snapshot.data.recommendAges;
    let allProduct: ProductResponse[] = this.route.snapshot.data.allProduct;
    let buyPrices: number[] = allProduct.map((product) => product.buyPrice);
    this.configureSlider.max = Math.max(...buyPrices);
  }

  ngOnInit(): void {}
  onChangeCategory(event: MatRadioChange) {
    const sltCategoryId: number = event.value;
    let currFilter = this.productFilterChainService.filterBSub.value;
    currFilter.category = sltCategoryId;
    this.productFilterChainService.filterBSub.next(currFilter);
  }
  onChangeBrand(event: MatRadioChange) {
    const sltBrandId: number = event.value;
    let currFilter = this.productFilterChainService.filterBSub.value;
    currFilter.brand = sltBrandId;
    this.productFilterChainService.filterBSub.next(currFilter);
  }
  onChangeSlider(event: MatSliderChange) {
    let sltValue = event.value;
    if (sltValue) {
      let currFilter = this.productFilterChainService.filterBSub.value;
      currFilter.price = [0, sltValue];
      this.productFilterChainService.filterBSub.next(currFilter);
    }
  }
  onChangeRecommendAge(event: MatRadioChange) {
    const sltAgeId: number = event.value;
    let currFilter = this.productFilterChainService.filterBSub.value;
    currFilter.age = sltAgeId;
    this.productFilterChainService.filterBSub.next(currFilter);
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
}
