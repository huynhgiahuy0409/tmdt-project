import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import { RegisterAccountRequest } from '../model/request';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) {}
  register(
    registerAccountRequest: RegisterAccountRequest
  ): Observable<RegisterAccountRequest> {
    const url = `${DOMAIN}/api/register`;
    return this.httpClient.post<any>(
      url,
      registerAccountRequest,
      this.httpOptions
    );
  }
  generateMailOTP(registerAccountRequest: RegisterAccountRequest) {
    const url = `${DOMAIN}/api/otp/generateOtp`;
    return this.httpClient.post(url, registerAccountRequest, this.httpOptions);
  }
  validOTP(OTPNumbers: number[], registerAccountRequest: RegisterAccountRequest) {
    let OTP: string = '';
    OTPNumbers.forEach((number) => {
      OTP += number;
    });
    this.httpOptions.params = { otpnum: Number.parseInt(OTP) };
    const url = `${DOMAIN}/api/otp/validateOtp`;
    return this.httpClient.post(url, registerAccountRequest, this.httpOptions);
  }
}
