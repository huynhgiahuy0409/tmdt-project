import { DIRECT_LINK_IMAGE } from 'src/app/_models/constance';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, map, switchMap, tap, debounceTime } from 'rxjs/operators';
import { ProductResponse, ShopResponse } from 'src/app/_models/response';
import { ProductService } from '../../services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ProductFilterChainService } from '../../services/product-filter-chain.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopResolve } from 'src/app/seller/services/resolve/shop.resolve';
import { ShopService } from 'src/app/seller/services/shop.service';
import { of } from 'rxjs';
import { FilterChain } from '../../model/filter';

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
  pageSize = 8;
  pageSizeOptions: number[] = [ 8, 12, 16, 20];
  products$!: Observable<ProductResponse[]>;
  shops$!: Observable<ShopResponse[] | null>
  searchShopValue!: string
  constructor(
    private route: ActivatedRoute,  
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private shopService: ShopService,
    public  productFilterChainService: ProductFilterChainService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.spinnerService.isLoadingBSub.next(true)
    // let initFilter: FilterChain = {
    //   pagination: {
    //     pageIndex: 0,
    //     pageSize: this.productFilterChainService.filterBSub.value.pagination.pageSize,
    //   },
    // };
    // this.productFilterChainService.filterBSub.next(initFilter)
    let initProductFilter = this.productFilterChainService.filterBSub.value;
    initProductFilter.pagination.pageSize = this.pageSize;
    this.productFilterChainService.filterBSub.next(initProductFilter);
    this.shops$ = this.shopService.searchShop$.pipe(switchMap(searchShopValue => {
      if(searchShopValue){
        console.log(searchShopValue);
        this.searchShopValue = searchShopValue
        return this.shopService.searchShopByName(searchShopValue)
      }
      return of(null)
    }))
    this.products$ = this.productFilterChainService.filter$.pipe(
      debounceTime(300),
      switchMap((productFilter) => {
        this.spinnerService.isLoadingBSub.next(false)
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
    console.log(currFilter);
    
    this.spinnerService.isLoadingBSub.next(true)
    this.productFilterChainService.filterBSub.next(currFilter);
  }
  navigateToShop(shopId: number){
    this.router.navigate([`/buyer/shop/${shopId}`])
  }
}
