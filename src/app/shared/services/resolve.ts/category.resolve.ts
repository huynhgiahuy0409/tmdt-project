import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryResponse } from 'src/app/_models/response';
import { CategoryService } from '../category.service';

@Injectable()
export class CategoryResolve implements Resolve<CategoryResponse[]> {
  constructor(private categoryService: CategoryService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<CategoryResponse[]> {
    return this.categoryService.findPagination({ pageIndex: 0, pageSize: 10 });
  }
}
