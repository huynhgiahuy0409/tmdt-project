import { Pagination } from '../../buyer/model/request';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PagingService {
  initPagination = {
    pageIndex: 0,
    pageSize: 10,
  };
  paginationBSub: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>(
    this.initPagination
  );
  pagination$: Observable<Pagination> = this.paginationBSub.asObservable();
}
