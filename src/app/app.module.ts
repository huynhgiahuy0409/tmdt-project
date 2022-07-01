import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbModule } from './shared/layout/customer/breadcrumb';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '.';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { PageNotFoundComponent } from './shared/layout/common/page-not-found/page-not-found.component';
import { RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CoreModule } from './core/core.module';
import { SpinnerService } from './shared/services/spinner.service';
import { CategoryResolve } from './shared/services/resolve.ts/category.resolve';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthService } from './buyer/services/auth.service';
import { appInitializer } from './core/app.initializer';
import { DialogService } from './buyer/services/dialog.service';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    SocialLoginModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('4441618775933631'),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '42510119300-4pjjafbekic220be3oa9ug0ep3t49p2v.apps.googleusercontent.com'
            ),
          },
          
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService,CookieService, DialogService],
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
