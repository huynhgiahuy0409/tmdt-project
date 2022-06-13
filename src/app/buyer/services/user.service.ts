import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userBehaviorSubject!: BehaviorSubject<User | null>
  user$!: Observable<User | null>
  constructor(private cookieService: CookieService) {
    this.userBehaviorSubject = new BehaviorSubject<User | null>(null)
    this.user$ = this.userBehaviorSubject.asObservable()
    this.user$.subscribe(value => {
      console.log(value)
    })
  }
}
