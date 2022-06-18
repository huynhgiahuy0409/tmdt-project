import { debounceTime, map, tap } from 'rxjs/operators';
import { Product, ProductRequest } from 'src/app/_models/request';
import { Observable } from 'rxjs/internal/Observable';
import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DIRECT_LINK_IMAGE, DOMAIN } from 'src/app/_models/constance';
import {
  CategoryResponse,
  OriginResponse,
  ProductResponse,
} from 'src/app/_models/response';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { FilterChain } from '../model/filter';
export interface FromObject {
  [key: string]: any;
}
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
  constructor(
    private httpClient: HttpClient,
    private spinnerService: SpinnerService
  ) {}
  findProducts(filterChain: FilterChain): Observable<ProductResponse[]> {
    const url = `${DOMAIN}/api/product`;
    const { pagination, name, price, category, brand, age } = filterChain;
    const { pageIndex, pageSize, sorter } = pagination;
    let fromObject: FromObject = { pageIndex: pageIndex, pageSize: pageSize };
    if (sorter) {
      fromObject['dirSort'] = sorter.dir;
      fromObject['orderSort'] = sorter.order;
    }
    if (name) {
      fromObject['nameFilter'] = name;
    }
    if (category) {
      fromObject['categoryIdFilter'] = category;
    }
    if (brand) {
      fromObject['brandIdFilter'] = brand;
    }
    if (price) {
      fromObject['priceFilter'] = price;
    }
    if (age) {
      fromObject['ageIdFilter'] = age;
    }
    let paramsOptions: HttpParamsOptions = { fromObject };
    let params = new HttpParams(paramsOptions);
    this.httpOptions.params = params;
    return this.httpClient.get<ProductResponse[]>(url, this.httpOptions).pipe(
      map((products) => {
        this.spinnerService.isLoadingBSub.next(false);
        products.map(
          (product) => {
            product.images.map((image) => {
              image.url = DIRECT_LINK_IMAGE + '/' + image.url;
            });
          },
          tap((products) => {
            this.spinnerService.isLoadingBSub.next(false);
          })
        );
        return products;
      })
    );
  }
  findAll(): Observable<ProductResponse[]> {
    const url = `${DOMAIN}/api/product/all`;
    return this.httpClient.get<ProductResponse[]>(url, this.httpOptions).pipe(
        map((products) => {
          this.spinnerService.isLoadingBSub.next(false);
          products.map(
            (product) => {
              product.images.map((image) => {
                image.url = DIRECT_LINK_IMAGE + '/' + image.url;
              });
            },
            tap((products) => {
              this.spinnerService.isLoadingBSub.next(false);
            })
          );
          return products;
        })
      );
  }
  findOne(productId: number): Observable<ProductResponse>{
    const url = `${DOMAIN}/api/product/${productId}`;
    return this.httpClient.get<ProductResponse>(url, this.httpOptions)
  }
}
