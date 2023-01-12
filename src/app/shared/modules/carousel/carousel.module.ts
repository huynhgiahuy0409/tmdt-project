import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselListComponent } from './carousel-list/carousel-list.component';
import { CarouselControllerComponent } from './carousel-controller/carousel-controller.component';
import { CarouselComponent } from './carousel.component';



@NgModule({
  declarations: [
    CarouselItemComponent,
    CarouselListComponent,
    CarouselControllerComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CarouselComponent]
})
export class CarouselModule { }
