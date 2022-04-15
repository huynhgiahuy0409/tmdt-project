import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PREFIX_API } from 'src/app/seller/models/Constance';
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
    param: {},
  };
  constructor(private httpClient: HttpClient) {}
  findAll() {
    const url = `${DOMAIN}${PREFIX_API}/recommend-age/all`;
    return this.httpClient.get<RecommendAgeResponse[]>(url, this.httpOptions);
  }
}
