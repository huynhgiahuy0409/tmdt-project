import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModules } from './material.module';
import { AdminHeaderModule } from './shared/layout/admin/header/header.module';
import { AuthModule } from './shared/layout/common/auth/auth.module';
import { BreadcrumbModule } from './shared/layout/customer/breadcrumb';
import { CustomerFooterModule } from './shared/layout/customer/footer';
import { CustomerHeaderModule } from './shared/layout/customer/header';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    MaterialModules,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
