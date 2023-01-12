import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerAuthRoutingModule } from './buyer-auth-routing.module';
import { BuyerAuthComponent } from './buyer-auth.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetComponent } from './components/reset/reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    BuyerAuthComponent,
    SignInComponent,
    SignUpComponent,
    ResetComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BuyerAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BuyerAuthModule { }
