import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerComponent } from './buyer.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog.detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { BlogComponent } from './components/blog/blog.component';
import { CheckoutComponent } from './components/checkout';

const routes: Routes = [
  { path: '', component: BuyerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutUsComponent },
  {
    path: 'blog',
    component: BlogComponent,
    // children: [
    //   {
    //     path: 'id', component: BlogDetailComponent,
    //   },
    // ],
  },
  {
    path: 'id',
    component: BlogDetailComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
