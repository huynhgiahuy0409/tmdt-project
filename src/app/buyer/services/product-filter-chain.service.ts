import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FilterChain } from '../model/filter';
@Injectable()
export class ProductFilterChainService {
  initPageSize: number = 10;
  initFilter: FilterChain = {
    pagination: {
      pageIndex: 0,
      pageSize: this.initPageSize,
    },
  };
  filterBSub: BehaviorSubject<FilterChain> = new BehaviorSubject<FilterChain>(
    this.initFilter
  );
  filter$: Observable<FilterChain> = this.filterBSub.asObservable();
  constructor() {}
}
