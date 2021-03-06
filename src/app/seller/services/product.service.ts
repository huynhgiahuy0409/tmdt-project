import { Product, ProductRequest } from 'src/app/_models/request';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import { CategoryResponse, OriginResponse } from 'src/app/_models/response';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  addProduct(product: Product, userId: number): Observable<number> {
    const url = `${DOMAIN}/api/product/add`;
    this.httpOptions.params = {
      userId: userId
    }
    return this.httpClient.post<number>(url, product, this.httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
