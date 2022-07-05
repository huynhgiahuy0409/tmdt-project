import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import {
  AuthenticationRequest,
  RegisterAccountRequest,
} from '../model/request';
import { map, tap, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { JWT } from '../model/jwt';
import { ReAccount } from '../model/re-account';
import { CartService } from './cart.service';
import { AuthenticationResponse } from 'src/app/_models/response';
import { FromObject } from './product.service';
import { DialogService } from './dialog.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessTokenBehaviorSubject!: BehaviorSubject<JWT | null>;
  accessToken$!: Observable<JWT | null>;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private userService: UserService,
    private cookieService: CookieService,
    private cartService: CartService,
    private dialogService: DialogService
  ) {
    this.accessTokenBehaviorSubject = new BehaviorSubject<JWT | null>(null);
    this.accessToken$ = this.accessTokenBehaviorSubject.asObservable();
    this.accessToken$.subscribe((v) => {
      console.log(v);
    });
  }
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
  generateMailOTP(
    registerAccountRequest: RegisterAccountRequest
  ): Observable<RegisterAccountRequest> {
    const url = `${DOMAIN}/api/otp/generateOtp`;
    return this.httpClient.post<RegisterAccountRequest>(
      url,
      registerAccountRequest,
      this.httpOptions
    );
  }
  validOTP(OTPNumbers: number[], username: string): Observable<boolean> {
    let OTP: string = '';
    OTPNumbers.forEach((number) => {
      OTP += number;
    });
    // let fromObject: FromObject = {
    //   OTPNumber: Number.parseInt(OTP),
    //   username: username,
    // };
    // let paramsOptions: HttpParamsOptions = { fromObject };
    // let params = new HttpParams(paramsOptions);
    // this.httpOptions.params = params;
    this.httpOptions.params = {
      OTPNumber: Number.parseInt(OTP),
      username: username,
    };
    const url = `${DOMAIN}/api/otp/validateOtp`;
    return this.httpClient.get<boolean>(url, this.httpOptions);
  }
  updateUser(
    registerAccountRequest: RegisterAccountRequest
  ): Observable<boolean> {
    const url = `${DOMAIN}/api/user`;
    return this.httpClient.post<boolean>(
      url,
      registerAccountRequest,
      this.httpOptions
    );
  }
  login(
    authenticateRequest: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    const url = `${DOMAIN}/api/login`;
    return this.httpClient.post<AuthenticationResponse>(
      url,
      authenticateRequest,
      this.httpOptions
    );
  }
  refreshTokenTimeout: any;
  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
  logout(): Observable<number> {
    return this.httpClient.get<number>(
      `${DOMAIN}/api/revoke-token`,
      this.httpOptions
    );
  }
  storeRefreshToken(refreshToken: JWT) {
    const { token, tokenExpirationDate } = refreshToken;
    this.cookieService.set(
      'refresh-token',
      token,
      undefined,
      undefined,
      undefined,
      true,
      'Strict'
    );
  }
  refreshAccessToken(): Observable<AuthenticationResponse> {
    const url = `${DOMAIN}/api/refresh-access-token`;
    return this.httpClient
      .get<AuthenticationResponse>(url, this.httpOptions)
      .pipe(
        tap((authenticationResponse) => {
          if (authenticationResponse) {
            this.userService.userBehaviorSubject.next(
              authenticationResponse.user
            );
            this.accessTokenBehaviorSubject.next(
              authenticationResponse.accessToken
            );
            this.cartService.cartBehaviorSubject.next(
              authenticationResponse.user.cart
            );
            this.storeRefreshToken(authenticationResponse.refreshToken);
            this.startRefreshAccessTokenTimer(
              authenticationResponse.accessToken
            );
          }
        })
      );
  }
  startRefreshAccessTokenTimer(accessJWT: JWT): void {
    const refreshToken = this.cookieService.get('refresh-token');
    const timeOut = accessJWT.tokenExpirationDate - Date.now() - 5000;
    this.refreshTokenTimeout = setTimeout(() => {
      if (refreshToken) {
        this.refreshAccessToken().subscribe();
      } else {
        /* notified end of session */
      }
    }, timeOut);
  }
  checkExistUser(username: string): Observable<boolean> {
    const url = `${DOMAIN}/api/check-user`;
    this.httpOptions.params = { username: username };
    return this.httpClient.get<boolean>(url, this.httpOptions).pipe();
  }
  resetPassword(reAccount: ReAccount): Observable<boolean> {
    const url = `${DOMAIN}/api/reset-password`;
    return this.httpClient.post<boolean>(url, reAccount, this.httpOptions);
  }
 
}
