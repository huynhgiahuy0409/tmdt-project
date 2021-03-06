import { ProductFilterChainService } from './../../../services/product-filter-chain.service';
import { map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../product';
import { PostService } from '../../../post.service';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from 'src/app/_models/response';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/buyer/services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { DIRECT_LINK_IMAGE } from 'src/app/_models/constance';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { FilterChain } from 'src/app/buyer/model/filter';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input()
  products$!: Observable<ProductResponse[]>;
  @Input()
  length!: number;
  @Input()
  pageSize!: number;
  @Input()
  pageSizeOptions!: number[];
  directLink = DIRECT_LINK_IMAGE;
  // MatPaginator Output
  constructor(
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private productFilterChainService: ProductFilterChainService
  ) {}
  ngOnInit(): void {}
  pageEvent($event: PageEvent) {
    this.spinnerService.isLoadingBSub.next(true);
    let pagination: FilterChain = this.productFilterChainService.filterBSub.value
    pagination.pagination.pageIndex = $event.pageIndex
    pagination.pagination.pageSize = $event.pageSize
    console.log(pagination)
    this.productFilterChainService.filterBSub.next(pagination)
    
  }
}
