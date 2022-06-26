import { DIRECT_LINK_IMAGE, DOMAIN } from './../../_models/constance';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PendingItemRequest } from 'src/app/_models/request';
import { CartResponse } from 'src/app/_models/response';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartBehaviorSubject: BehaviorSubject<CartResponse | null> = new BehaviorSubject<CartResponse | null>(null)
    cart$: Observable<CartResponse | null> = this.cartBehaviorSubject.asObservable()
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        params: {},
    };
    constructor(private httpClient: HttpClient) {
    }
    flushCart(cartId: number, pendingItem: PendingItemRequest): Observable<CartResponse>{
        const url = `${DOMAIN}/api/cart/${cartId}/cartItem`;
        return this.httpClient.post<CartResponse>(url, pendingItem, this.httpOptions)
    }
}