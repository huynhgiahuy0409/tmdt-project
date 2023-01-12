import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CarouselService } from '../carousel.service';

@Component({
  selector: 'app-carousel-controller',
  templateUrl: './carousel-controller.component.html',
  styleUrls: ['./carousel-controller.component.scss'],
})
export class CarouselControllerComponent implements OnInit, AfterViewInit {
  @ViewChild('carouselArrowPrev', { static: true })
  carouselArrowPrev!: ElementRef;
  @ViewChild('carouselArrowNext', { static: true })
  carouselArrowNext!: ElementRef;
  sliderItemIdx = 0;
  positionX = 0;
  sliderItemWidth!: number;
  sliderListWidth!: number;
  totalSliderItem!: number;
  constructor(private __carouselService: CarouselService) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {}
  processCarousel(action: '+' | '-') {
    this.sliderItemWidth = this.__carouselService.getSliderItemWidth();
    this.sliderListWidth = this.__carouselService.getSliderListWidth();
    this.totalSliderItem = this.__carouselService.getTotalSliderItem();
    let lastSliderItemIdx: number;
    const totalWidth = this.sliderItemWidth * this.totalSliderItem;

    const remainderWidth = totalWidth % this.sliderListWidth;

    if (remainderWidth === 0) {
      lastSliderItemIdx = totalWidth / this.sliderListWidth;
    } else {
      lastSliderItemIdx = Math.floor(totalWidth / this.sliderListWidth) + 1;
    }

    if (action == '+') {
      this.sliderItemIdx++;
    } else {
      this.sliderItemIdx--;
    }
    if (this.sliderItemIdx === 0) {
      this.carouselArrowPrev.nativeElement.classList.add(
        'carousel-arrow--hidden'
      );
    } else if (this.sliderItemIdx === lastSliderItemIdx - 1) {
      this.carouselArrowNext.nativeElement.classList.add(
        'carousel-arrow--hidden'
      );
    } else {
      this.carouselArrowPrev.nativeElement.classList.remove(
        'carousel-arrow--hidden'
      );
      this.carouselArrowNext.nativeElement.classList.remove(
        'carousel-arrow--hidden'
      );
    }
    if (this.sliderItemIdx === lastSliderItemIdx - 1) {
      this.positionX = (this.sliderItemIdx - 1) * 100;
      const remainderPercent: number =
        (remainderWidth * 100) / this.sliderListWidth;
      this.__carouselService.nextPositionXSub(
        this.positionX + remainderPercent
      );
    } else {
      this.positionX = this.sliderItemIdx * 100;
      this.__carouselService.nextPositionXSub(this.positionX);
    }
  }
}
