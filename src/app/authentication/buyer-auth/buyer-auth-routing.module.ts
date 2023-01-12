import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerAuthComponent } from './buyer-auth.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetComponent } from './components/reset/reset.component';


const routes: Routes = [
  {
    path: '',
    component: BuyerAuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'reset',
        component: ResetComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerAuthRoutingModule {}
