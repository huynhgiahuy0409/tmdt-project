import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pagination } from 'src/app/buyer/model/request';
import { DOMAIN } from 'src/app/_models/constance';
import { RecommendAgeResponse } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root',
})
export class RecommendAgeService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) {}
  findAll() {
    const url = `${DOMAIN}/api/recommend-age`;
    return this.httpClient.get<RecommendAgeResponse[]>(url, this.httpOptions);
  }
  findPagination(pagination: Pagination): Observable<RecommendAgeResponse[]> {
    const url = `${DOMAIN}/api/recommend-age`;
    const { pageIndex, pageSize } = pagination;
    this.httpOptions.params = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
    return this.httpClient.get<RecommendAgeResponse[]>(url, this.httpOptions);
  }
}
