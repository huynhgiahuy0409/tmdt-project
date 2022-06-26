import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import { CategoryResponse } from 'src/app/_models/response';
import { Pagination } from 'src/app/_models/pagination';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories!: CategoryResponse[];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  findPagination(pagination: Pagination): Observable<CategoryResponse[]> {
    const url = `${DOMAIN}/api/category`;
    const { pageIndex, pageSize } = pagination;
    this.httpOptions.params = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
    return this.httpClient.get<CategoryResponse[]>(url, this.httpOptions);
  }
  findAll(): Observable<CategoryResponse[]> {
    const url = `${DOMAIN}/api/category/all`;
    return this.httpClient.get<CategoryResponse[]>(url, this.httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
