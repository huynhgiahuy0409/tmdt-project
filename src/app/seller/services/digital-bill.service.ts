import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
export interface DigitalBillRequest {
    encryptHash: string;
    orderId: number
}
@Injectable({
    providedIn: 'root',
})
export class DigitalBillService {
    constructor(private httpClient: HttpClient) { }
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        param: {},
    };
    verifyDigitalBill(encryptHash: string, orderId: number, userId: number): Observable<string> {
        let digitalBillRequest: DigitalBillRequest = {
            encryptHash: encryptHash,
            orderId: orderId
        }
        const url = `${DOMAIN}/api/verify/user/${userId}/digital-bill`;
        return this.httpClient.post<string>(url, digitalBillRequest, this.httpOptions);
    }
}
