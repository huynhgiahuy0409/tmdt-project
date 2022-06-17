import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  findAll(): Observable<CategoryResponse[]> {
    const url = `${DOMAIN}/api/category`;
    return this.httpClient.get<CategoryResponse[]>(url, this.httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
