import { CustomerHeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CustomerHeaderComponent],
  imports: [CommonModule],
  exports: [
    CustomerHeaderComponent
  ]
})
export class CustomerHeaderModule {}
