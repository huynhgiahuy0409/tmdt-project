import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './jwt.interceptor';
import { appInitializer } from './app.initializer';
import { AuthService } from '../buyer/services/auth.service';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, CookieService],
    },
    AuthService, 
    CookieService
  ]
})
export class CoreModule { }
