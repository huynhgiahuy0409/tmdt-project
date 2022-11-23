import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [{
  path: '', component: AuthenticationComponent, children: [
    {
      path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'reset', component: ResetComponent
    },
    {
      path: 'signup', component: RegisterComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
