import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./buyer-auth/buyer-auth.module').then(
            (m) => m.BuyerAuthModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./seller-ath/seller-ath.module').then(
            (m) => m.SellerAthModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
