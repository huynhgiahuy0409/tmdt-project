import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerComponent } from './buyer.component';
/* import { BlogDetailComponent } from './components/blog/blog-detail/blog.detail.component';
import { BlogComponent } from './components/blog/blog.component'; */
import { BlogComponent, BlogDetailComponent } from './components/blog';
import { CheckoutComponent } from './components/checkout';
import { AboutUsComponent } from './components/aboutUs';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: BuyerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: RegisterComponent },
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: BlogDetailComponent},
  { path: 'checkout',component: CheckoutComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
