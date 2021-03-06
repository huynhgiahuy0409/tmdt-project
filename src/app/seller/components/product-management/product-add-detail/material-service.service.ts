import { MaterialResponse } from './../../../../_models/response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';

@Injectable({
  providedIn: 'root',
})
export class MaterialServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    param: {},
  };
  constructor(private httpClient: HttpClient) {}
  findAll() {
    const url = `${DOMAIN}/api/material`;
    return this.httpClient.get<MaterialResponse[]>(url, this.httpOptions);
  }
}
