import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {
    CANCEL_ORDER_STATUS,
    DELIVERED_ORDER_STATUS,
    DOMAIN,
    PAID_PAYMENT_STATUS,
    PENDING_ORDER_STATUS,
    SHIPPING_ORDER_STATUS,
    UNPAID_PAYMENT_STATUS,
    WAITING_PICK_ORDER_STATUS,
} from 'src/app/_models/constance';
import {
    CartItemResponse,
    OrderResponse,
    UserResponse,
} from 'src/app/_models/response';
import { RegisterAccountRequest } from '../model/request';
import { OrderRequest } from 'src/app/_models/request';
@Injectable({
    providedIn: 'root',
})
export class OrderService {
    orderBehaviorSubject: BehaviorSubject<OrderResponse | null> =
        new BehaviorSubject<OrderResponse | null>(null);
    order$: Observable<OrderResponse | null> =
        this.orderBehaviorSubject.asObservable();
    receiptBehaviorSubject: BehaviorSubject<OrderResponse[] | null> =
        new BehaviorSubject<OrderResponse[] | null>(null);
    receipt$: Observable<OrderResponse[] | null> =
        this.receiptBehaviorSubject.asObservable();
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        params: {},
    };
    constructor(
        private cookieService: CookieService,
        private httpClient: HttpClient
    ) { }
    createOrder(
        userId: number,
        orderRequest: OrderRequest
    ): Observable<OrderResponse> {
        const url = `${DOMAIN}/api/user/${userId}/order`;
        return this.httpClient.post<OrderResponse>(
            url,
            orderRequest,
            this.httpOptions
        );
    }
    findAll(userId: number): Observable<OrderResponse[]> {
        const url = `${DOMAIN}/api/user/${userId}/order`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions);
    }
    findAllByStatus(userId: number, status: string): Observable<OrderResponse[]> {
        const url = `${DOMAIN}/api/user/${userId}/order/status/${status}`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions);
    }
    findByOrderId(orderId: number): Observable<OrderResponse> {
        const url = `${DOMAIN}/api/order/${orderId}`;
        return this.httpClient.get<OrderResponse>(url, this.httpOptions);
    }
    findAllByStatusAndShop(
        shopId: number,
        status: string
    ): Observable<OrderResponse[]> {
        const url = `${DOMAIN}/api/shop/${shopId}/order/status/${status}`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions);
    }
    findAllByShop(shopId: number): Observable<OrderResponse[]> {
        const url = `${DOMAIN}/api/shop/${shopId}/order`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions);
    }
    findAllByUser(userId: number): Observable<OrderResponse[]> {
        const url = `${DOMAIN}/api/user/${userId}/order`;
        return this.httpClient.get<OrderResponse[]>(url, this.httpOptions);
    }
    updateStatus(orderId: number, status: string): Observable<boolean> {
        const url = `${DOMAIN}/api/order/${orderId}/status/${status}`;
        return this.httpClient.get<boolean>(url, this.httpOptions);
    }
    updatePaymentStatus(orderId: number, status: string): Observable<boolean> {
        const url = `${DOMAIN}/api/order/${orderId}/payment-status/${status}`;
        return this.httpClient.get<boolean>(url, this.httpOptions);
    }
    setupOrderStatus(orderStatus: string): string {
        let statusLabel = '';
        if (orderStatus === CANCEL_ORDER_STATUS) {
            statusLabel = 'Đã hủy';
        } else if (orderStatus === PENDING_ORDER_STATUS) {
            statusLabel = 'Chờ xác nhận';
        } else if (orderStatus === WAITING_PICK_ORDER_STATUS) {
            statusLabel = 'Chờ lấy hàng';
        } else if (orderStatus === SHIPPING_ORDER_STATUS) {
            statusLabel = 'Đang giao';
        } else if (orderStatus === DELIVERED_ORDER_STATUS) {
            statusLabel = 'Đã giao';
        }
        return statusLabel;
    }
    setupOrderPaymentStatus(orderPaymentStatus: string): string {
        let statusLabel = '';
        if (orderPaymentStatus === PAID_PAYMENT_STATUS) {
            statusLabel = 'Đã thanh toán';
        } else if (orderPaymentStatus === UNPAID_PAYMENT_STATUS) {
            statusLabel = 'Chưa thanh toán';
        }
        return statusLabel;
    }
}
