import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/costant';
import { CategoryRequest } from 'src/app/_models/response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories!: CategoryRequest[];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    param: {},
  };
  findAll() {
    const url = `${DOMAIN}/api/category`;
    return this.httpClient.get<CategoryRequest[]>(url, this.httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
