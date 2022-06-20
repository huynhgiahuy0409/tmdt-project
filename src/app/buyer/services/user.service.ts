import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DOMAIN } from 'src/app/_models/constance';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userBehaviorSubject!: BehaviorSubject<User | null>
  user$!: Observable<User | null>
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
    this.userBehaviorSubject = new BehaviorSubject<User | null>(null)
    this.user$ = this.userBehaviorSubject.asObservable()
    this.user$.subscribe(value => {
      console.log(value)
    })
  }
  updateUser(user: any): Observable<User> {
    const url = `${DOMAIN}/api/user/update`;
    return this.httpClient.post<User>(url, user, this.httpOptions).pipe(tap(user => {
      this.userBehaviorSubject.next(user)
    }))
  }
}
