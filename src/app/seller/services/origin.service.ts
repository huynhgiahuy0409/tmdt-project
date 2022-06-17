import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import { CategoryResponse, OriginResponse } from 'src/app/_models/response';
@Injectable({
  providedIn: 'root',
})
export class OriginService {
  origins!: OriginResponse[];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    param: {},
  };
  findAll(): Observable<OriginResponse[]> {
    const url = `${DOMAIN}/api/origin`;
    return this.httpClient.get<OriginResponse[]>(url, this.httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
