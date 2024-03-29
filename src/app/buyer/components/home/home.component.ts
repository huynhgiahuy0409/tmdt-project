import { map } from 'rxjs/operators';
import { PiechartComponent } from './../../../seller/components/piechart/piechart.component';
import { Pagination, Sorter } from './../../../_models/pagination';
import { FilterChain } from './../../model/filter';
import { from, fromEvent, fromEventPattern, Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from 'src/app/_models/response';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products$!: Observable<ProductResponse[]>;
  mostViewProducts$!: Observable<ProductResponse[]>;
  isClick = false
  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {
  }

  addClickHandler(handler: any) {
    document.addEventListener('click', handler);
  }

  removeClickHandler(handler: any) {
    // document.removeEventListener('click', handler);
  }
  ngOnInit(): void {

    let sort: Sorter = {
      dir: 'desc',
      order: 'createdDate',
    };
    let pagination: Pagination = {
      pageIndex: 0,
      pageSize: 10,
      sorter: sort,
    };
    let filterChain: FilterChain = {
      pagination: pagination,
    };
    this.products$ = this.productService.findProducts(filterChain);
    this.mostViewProducts$ = this.productService.findProducts({
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        sorter: {
          dir: 'desc',
          order: 'view',
        },
      },
    });
    let observable = new Observable<number>((sub) => {
      let arr = [1, 2, 3, 4];
      arr.forEach((i) => {
        sub.next(i);
      });
      return {
        unsubscribe() {},
      };
    });
    observable.subscribe({
      next: (v) => {
        console.log(v);
      },
      complete: () => {
        console.log('Dont');
      },
    });
    let arr = [1, 2, 3, 4];
    from(arr).subscribe((v) => {
      console.log(v);
    });
  }
}
