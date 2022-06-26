import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DOMAIN } from 'src/app/_models/constance';
import { UserResponse } from 'src/app/_models/response';
import { RegisterAccountRequest } from '../model/request';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userBehaviorSubject!: BehaviorSubject<UserResponse | null>
  user$!: Observable<UserResponse | null>
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
    this.userBehaviorSubject = new BehaviorSubject<UserResponse | null>(null)
    this.user$ = this.userBehaviorSubject.asObservable()
    this.user$.subscribe(value => {
      console.log(value)
    })
  }
  fetchUser(user: any): Observable<UserResponse> {
    const url = `${DOMAIN}/api/user/update`;
    return this.httpClient.post<UserResponse>(url, user, this.httpOptions).pipe(tap(user => {
      this.userBehaviorSubject.next(user)
    }))
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
}
