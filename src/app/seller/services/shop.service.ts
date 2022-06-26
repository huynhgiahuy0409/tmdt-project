import { PageEvent } from '@angular/material/paginator';
import { Product, ProductRequest } from 'src/app/_models/request';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import {
    CategoryResponse,
    OriginResponse,
    ShopResponse,
} from 'src/app/_models/response';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class ShopService {
    shopBehaviorSubject!: BehaviorSubject<ShopResponse | null>;
    shop$!: Observable<ShopResponse | null>;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        params: {},
    };
    constructor(private httpClient: HttpClient) {
        this.shopBehaviorSubject = new BehaviorSubject<ShopResponse | null>(null);
        this.shop$ = this.shopBehaviorSubject.asObservable();
    }
    findShopByUserId(userId: number): Observable<ShopResponse> {
        const url = `${DOMAIN}/api/shop/user/${userId}`;
        return this.httpClient.get<ShopResponse>(url, this.httpOptions).pipe(
            tap((shopResponse) => {
                this.shopBehaviorSubject.next(shopResponse);
            })
        );
    }
}
