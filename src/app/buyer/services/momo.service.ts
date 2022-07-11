import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { API_KEY_MOMO, DOMAIN, MOMO_PHONE } from 'src/app/_models/constance';
import { CartItemResponse, MomoTransactionsResponse, OrderResponse, UserResponse } from 'src/app/_models/response';
import { RegisterAccountRequest } from '../model/request';
import { OrderRequest } from 'src/app/_models/request';
export interface TransferResponse{
    status: string,
    statusId: number,
    msg: string,
    transId: number,
    balance: number
}
export interface TransferRequest{
    APIKey: string,
    phone: string,
    receiver: string,
    amount: string,
    content: string,
}
@Injectable({
    providedIn: 'root'
})
export class MomoService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        params: {},
    };
    constructor(private cookieService: CookieService, private httpClient: HttpClient) {
    }
    transfer(phone: string, receiver: string, amount: string, content: string): Observable<TransferResponse>{
        const transferRequest: TransferRequest = {
            APIKey: API_KEY_MOMO,
            phone: phone,
            receiver: receiver,
            amount: amount,
            content: content
        }
        const url = `https://momo.k04team.com/api/v2/chuyen-tien.asp`;
        return this.httpClient.post<TransferResponse>(url, transferRequest, this.httpOptions)
    }
    getTransactionHistory(): Observable<MomoTransactionsResponse>{
        const url = `${DOMAIN}/api/transaction-history/momo`;
        return this.httpClient.get<MomoTransactionsResponse>(url, this.httpOptions)
    }
}
