import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PREFIX_API } from 'src/app/seller/models/Constance';
import { DOMAIN } from 'src/app/_models/constance';
import { CategoryResponse } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories!: CategoryResponse[];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    param: {},
  };
  findAll() {
    const url = `${DOMAIN}${PREFIX_API}/category/all`;
    return this.httpClient.get<CategoryResponse[]>(url, this.httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
