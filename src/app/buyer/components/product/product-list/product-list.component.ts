import { map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../product';
import { PostService } from '../../../post.service';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from 'src/app/_models/response';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/buyer/services/product.service';
import { Pagination } from 'src/app/buyer/model/request';
import { PageEvent } from '@angular/material/paginator';
import { DIRECT_LINK_IMAGE } from 'src/app/_models/constance';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

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
    private spinnerService: SpinnerService
  ) {}
  ngOnInit(): void {}
  pageEvent($event: PageEvent) {
    // this.spinnerService.isLoadingBSub.next(true);
    // this.pageSize = $event.pageSize;
    // this.products$ = this.productService.findProducts(
    //   $event.pageIndex,
    //   this.pageSize
    // );
  }
}
