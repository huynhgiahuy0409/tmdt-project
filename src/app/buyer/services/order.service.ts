import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DOMAIN } from 'src/app/_models/constance';
import { CartItemResponse, OrderResponse, UserResponse } from 'src/app/_models/response';
import { RegisterAccountRequest } from '../model/request';
import { OrderRequest } from 'src/app/_models/request';
@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        params: {},
    };
    constructor(private cookieService: CookieService, private httpClient: HttpClient) {
    }
    createOrder(userId: number, orderRequest: OrderRequest): Observable<boolean> {
        const url = `${DOMAIN}/api/user/${userId}/order`;
        return this.httpClient.post<boolean>(url, orderRequest, this.httpOptions)
    }
    findAll(userId: number): Observable<OrderResponse[]>{
        const url = `${DOMAIN}/api/user/${userId}/order`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions)
    }
    findAllByStatus(userId: number, status: string): Observable<OrderResponse[]>{
        const url = `${DOMAIN}/api/user/${userId}/order/status/${status}`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions)
    }
    findAllByStatusAndShop(shopId: number, status: string): Observable<OrderResponse[]>{
        const url = `${DOMAIN}/api/shop/${shopId}/order/status/${status}`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions)
    }
    findAllByShop(shopId: number): Observable<OrderResponse[]>{
        const url = `${DOMAIN}/api/shop/${shopId}/order`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions)
    }
    updateStatus(orderId: number, status: string): Observable<boolean>{
        const url = `${DOMAIN}/api/order/${orderId}/status/${status}`;
        return this.httpClient.get<boolean>(url, this.httpOptions)
    }
}
