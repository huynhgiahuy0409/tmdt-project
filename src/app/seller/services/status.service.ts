import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import { CategoryResponse, StatusResponse } from 'src/app/_models/response';
@Injectable({
  providedIn: 'root',
})
export class StatusService {
  status!: StatusResponse[];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    param: {},
  };
  findAll(): Observable<StatusResponse[]> {
    const url = `${DOMAIN}/api/status`;
    return this.httpClient.get<StatusResponse[]>(url, this.httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
