import { DIRECT_LINK_IMAGE, DOMAIN } from './../../_models/constance';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PendingItemRequest } from 'src/app/_models/request';
import { CartResponse } from 'src/app/_models/response';
import { SummaryCart } from 'src/app/_models/models';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartBehaviorSubject: BehaviorSubject<CartResponse | null> =
        new BehaviorSubject<CartResponse | null>(null);
    cart$: Observable<CartResponse | null> =
        this.cartBehaviorSubject.asObservable();
    sumCartBehaviorSubject: BehaviorSubject<SummaryCart | null> =
        new BehaviorSubject<SummaryCart | null>(null);
    sumCart$: Observable<SummaryCart | null> =
        this.sumCartBehaviorSubject.asObservable();
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        params: {},
    };
    constructor(private httpClient: HttpClient) { }
    flushCart(
        cartId: number,
        pendingItem: PendingItemRequest
    ): Observable<CartResponse> {
        const url = `${DOMAIN}/api/cart/${cartId}/cartItem`;
        return this.httpClient.post<CartResponse>(
            url,
            pendingItem,
            this.httpOptions
        );
    }
    updatePendingItem(
        pendingItemId: number,
        quantity: number
    ): Observable<boolean> {
        const url = `${DOMAIN}/api/pendingItem/${pendingItemId}`;
        return this.httpClient.put<boolean>(url, quantity, this.httpOptions);
    }
    removePendingItem(pendingItemId: number) {
        const url = `${DOMAIN}/api/pendingItem/${pendingItemId}`;
        this.httpClient.delete(url, this.httpOptions).subscribe();
    }
}
