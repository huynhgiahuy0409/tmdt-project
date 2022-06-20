import { DIRECT_LINK_IMAGE, DOMAIN } from './../../_models/constance';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { Cart } from "src/app/_models/models";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PendingItemRequest } from 'src/app/_models/request';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartBehaviorSubject: BehaviorSubject<Cart | null> = new BehaviorSubject<Cart | null>(null)
    cart$: Observable<Cart | null> = this.cartBehaviorSubject.asObservable()
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        params: {},
    };
    constructor(private httpClient: HttpClient) {
    }
    flushCart(pendingItem: PendingItemRequest): Observable<Cart> {
        const url = `${DOMAIN}/api/cart/add`;
        return this.httpClient.post<Cart>(url, pendingItem, this.httpOptions).pipe(tap(cart => {
            console.log(cart)
            this.cartBehaviorSubject.next(cart)
        }));
    }
}