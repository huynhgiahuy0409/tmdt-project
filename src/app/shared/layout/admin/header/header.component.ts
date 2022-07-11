import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/buyer/services/auth.service';
import { CartService } from 'src/app/buyer/services/cart.service';
import { UserService } from 'src/app/buyer/services/user.service';
@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent {
  constructor(private authService: AuthService, private userService: UserService, private cartService: CartService, private cookieService: CookieService, private router: Router) { }
  logout() {
    this.authService.logout().pipe(
      map((value) => {
        return value != -1 ? true : false;
      }),
    ).subscribe(
      isLogout => {
        if (isLogout) {
          this.userService.userBehaviorSubject.next(null);
          this.authService.accessTokenBehaviorSubject.next(null);
          this.cartService.cartBehaviorSubject.next(null)
          this.cookieService.delete('refresh-token', "/");
          this.authService.stopRefreshTokenTimer();
          this.router.navigate(['/buyer/home'])
        }
      }
    );
  }
}

