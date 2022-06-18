import { DIRECT_LINK_IMAGE } from 'src/app/_models/constance';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, map, switchMap, tap, debounceTime } from 'rxjs/operators';
import { ProductResponse } from 'src/app/_models/response';
import { ProductService } from '../../services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ProductFilterChainService } from '../../services/product-filter-chain.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  selectedSort = null;
  sortSelections = [
    { label: 'Giá giảm dần', sort: { order: 'buyPrice', dir: 'desc' } },
    { label: 'Giá tăng dần', sort: { order: 'buyPrice', dir: 'asc' } },
    { label: 'Tên sản phẩm (A-Z)', sort: { order: 'name', dir: 'desc' } },
    { label: 'Tên sản phẩm (Z-A)', sort: { order: 'name', dir: 'asc' } },
  ];
  length = 200;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 4, 6];
  products$!: Observable<ProductResponse[]>;
  constructor(
    private route: ActivatedRoute,  
    private productService: ProductService,
    private spinnerService: SpinnerService,
    public  productFilterChainService: ProductFilterChainService
  ) {}
  ngOnInit(): void {
    let initProductFilter = this.productFilterChainService.filterBSub.value;
    initProductFilter.pagination.pageSize = this.pageSize;
    this.productFilterChainService.filterBSub.next(initProductFilter);
    this.products$ = this.productFilterChainService.filter$.pipe(
      debounceTime(1000),
      switchMap((productFilter) => {
        return this.productService.findProducts(productFilter);
      })
    );
  }
  onClickLastedProducts() {
    let currFilter = this.productFilterChainService.filterBSub.value;
    currFilter.pagination.sorter = {
      dir: 'desc',
      order: 'createdDate',
    };
    this.spinnerService.isLoadingBSub.next(true)
    this.productFilterChainService.filterBSub.next(currFilter);
  }
  onChangeSorter($event: any) {
    const { order, dir } = $event.value;
    let currFilter = this.productFilterChainService.filterBSub.value;
    currFilter.pagination.pageIndex = 0;
    currFilter.pagination.sorter = {
      dir: dir,
      order: order,
    };
    this.spinnerService.isLoadingBSub.next(true)
    this.productFilterChainService.filterBSub.next(currFilter);
  }
}
