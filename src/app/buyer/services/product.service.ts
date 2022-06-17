import { Product, ProductRequest } from 'src/app/_models/request';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import { CategoryResponse, OriginResponse, ProductResponse } from 'src/app/_models/response';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    param: {},
  };
  findAll(): Observable<ProductResponse[]> {
    const url = `${DOMAIN}/api/product/all`;
    return this.httpClient.get<ProductResponse[]>(url, this.httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
