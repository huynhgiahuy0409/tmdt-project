import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/_models/constance';
import {
  AuthenticationRequest,
  RegisterAccountRequest,
} from '../model/request';
import { map, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AuthenticationResponse } from '../model/response';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { JWT } from '../model/jwt';
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
    private httpClient: HttpClient,
    private userService: UserService,
    private cookieService: CookieService
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
  generateMailOTP(registerAccountRequest: RegisterAccountRequest) {
    const url = `${DOMAIN}/api/otp/generateOtp`;
    return this.httpClient.post(url, registerAccountRequest, this.httpOptions);
  }
  validOTP(
    OTPNumbers: number[],
    registerAccountRequest: RegisterAccountRequest
  ) {
    let OTP: string = '';
    OTPNumbers.forEach((number) => {
      OTP += number;
    });
    this.httpOptions.params = { otpnum: Number.parseInt(OTP) };
    const url = `${DOMAIN}/api/otp/validateOtp`;
    return this.httpClient
      .post(url, registerAccountRequest, this.httpOptions)
      .pipe();
  }
  login(
    authenticateRequest: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    const url = `${DOMAIN}/api/login`;
    return this.httpClient
      .post<AuthenticationResponse>(url, authenticateRequest, this.httpOptions)
      .pipe(
        tap((authentication) => {
          if (authentication) {
            console.log(authentication)
            this.userService.userBehaviorSubject.next(authentication.user);
            this.accessTokenBehaviorSubject.next(authentication.accessToken);
            this.storeRefreshToken(authentication.refreshToken);
            this.startRefreshAccessTokenTimer(authentication.accessToken);
          } else {
            console.log('not found refresh token');
          }
        })
      );
  }
  refreshTokenTimeout: any
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
  logout() {
    return this.httpClient.get(`${DOMAIN}/api/revoke-token`, this.httpOptions).pipe(
      map((value) => {
        console.log(value)
        return value != -1 ? true : false;
      }),
      tap(isLogout => {
        if(isLogout){
          console.log(isLogout)
          this.userService.userBehaviorSubject.next(null)
          this.accessTokenBehaviorSubject.next(null);
          this.stopRefreshTokenTimer()
        }
      })
    );
  }
  storeRefreshToken(refreshToken: JWT) {
    const { token, tokenExpirationDate } = refreshToken;
    this.cookieService.set(
      'refresh-token',
      token,
      tokenExpirationDate,
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
            this.storeRefreshToken(authenticationResponse.refreshToken);
            this.startRefreshAccessTokenTimer(
              authenticationResponse.accessToken
            );
          } else {
            console.log('not found refresh token');
          }
        })
      );
  }
  private startRefreshAccessTokenTimer(accessJWT: JWT): void {
    const refreshToken = this.cookieService.get('refresh-token');
    const timeOut = accessJWT.tokenExpirationDate - Date.now() - 5000;
    console.log(timeOut)
    this.refreshTokenTimeout = setTimeout(() => {
      if (refreshToken) {
        this.refreshAccessToken().subscribe();
      } else {
        /* notified end of session */
      }
    }, timeOut);
  }
  checkExistUser(username: string): Observable<boolean>{
    const url = `${DOMAIN}/api/check-user`;
    this.httpOptions.params = { username: username };
    return this.httpClient
      .get<boolean>(url, this.httpOptions)
  }
  resetPassword(newPassword: string){
    const url = `${DOMAIN}/api/reset-password`;
    return this.httpClient
      .post<boolean>(url, newPassword, this.httpOptions)
  }
}
