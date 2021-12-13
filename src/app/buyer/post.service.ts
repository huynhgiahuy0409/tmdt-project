import { NgModule, Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product";
@Injectable({
  providedIn: 'root'
})
export class PostService{
  random: number = Math.random();
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product/all`);
  }

}
