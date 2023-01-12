import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandResponse } from 'src/app/_models/response';
import { DOMAIN } from 'src/app/_models/constance';
import { Pagination } from 'src/app/_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) {
    this.findAll().subscribe({
      next: () => {},
      error: (e) => {},
      complete: () => {},
    });
    this.findAll().subscribe(
      (n) => {},
      (error) => {},
      () => {}
    );
  }
  findAll(): Observable<BrandResponse[]> {
    const url = `${DOMAIN}/api/brand/all`;
    return this.httpClient.get<BrandResponse[]>(url, this.httpOptions);
  }
  findPagination(pagination: Pagination): Observable<BrandResponse[]> {
    const url = `${DOMAIN}/api/brand`;
    const { pageIndex, pageSize } = pagination;
    this.httpOptions.params = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
    return this.httpClient.get<BrandResponse[]>(url, this.httpOptions);
  }
}
