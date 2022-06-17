import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandResponse } from 'src/app/_models/response';
import { DOMAIN } from 'src/app/_models/constance';

@Injectable({
  providedIn: 'root',
})
export class BrandServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    param: {},
  };
  constructor(private httpClient: HttpClient) {}
  findAll(): Observable<BrandResponse[]> {
    const url = `${DOMAIN}/api/brand`;
    return this.httpClient.get<BrandResponse[]>(url, this.httpOptions);
  }
}
