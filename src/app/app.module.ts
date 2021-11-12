import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModules } from './material.module';
import { AdminHeaderModule } from './shared/layout/admin/header/header.module';
import { BreadcrumbModule } from './shared/layout/customer/breadcrumb';
import { CustomerFooterModule } from './shared/layout/customer/footer';
import { CustomerHeaderModule } from './shared/layout/customer/header';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    BreadcrumbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
