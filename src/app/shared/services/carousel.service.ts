import {
  ElementRef,
  Injectable,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private imageCarouselList!: ElementRef<HTMLUListElement>;
  private imageCarouselItem!: QueryList<any>;
  private carouselItemIdx = 0;
  positionX = 0;
  private carouselIntervalId!: number;
  private autoTimer = 0
  nextCarouselTime: number = 5000;

  constructor() {
  }

  processCarousel(action: '+' | '-') {
    let isAuto = false
    if(this.carouselIntervalId){
      clearInterval(this.carouselIntervalId);
      isAuto = true
    }
    let lastSliderItemIdx: number;
    const sliderItem: ElementRef = this.imageCarouselItem.first;
    const sliderItemWidth: number = sliderItem.nativeElement.offsetWidth;
    const sliderListWidth: number =
      this.imageCarouselList.nativeElement.offsetWidth;
    const length: number = this.imageCarouselItem.length;
    const totalWidth = sliderItemWidth * length;
    const remainderWidth = totalWidth % sliderListWidth;

    if (remainderWidth === 0) {
      lastSliderItemIdx = totalWidth / sliderListWidth - 1;
    } else {
      lastSliderItemIdx = Math.floor(totalWidth / sliderListWidth);
    }

    if (action == '+') {
      this.carouselItemIdx++;
    } else {
      this.carouselItemIdx--;
    }
    if (this.carouselItemIdx > lastSliderItemIdx) {
      this.carouselItemIdx = 0;
    } else if (this.carouselItemIdx < 0) {
      this.carouselItemIdx = lastSliderItemIdx;
    }

    if (this.carouselItemIdx === lastSliderItemIdx) {
      if (remainderWidth > 0) {
        this.positionX = -((this.carouselItemIdx - 1) * 100);
      } else {
        this.positionX = -(this.carouselItemIdx * 100);
      }
      this.imageCarouselList.nativeElement.style.transform = `translateX(calc(${this.positionX}% - ${remainderWidth}px))`;
    } else {
      this.positionX = -this.carouselItemIdx * 100;
      this.imageCarouselList.nativeElement.style.transform = `translateX(calc(${this.positionX}%))`;
    }
    if(isAuto){
      this.activeCarousel(this.autoTimer)
    }
  }

  set setImageCarouselList(imageCarouselList: ElementRef<HTMLUListElement>) {
    this.imageCarouselList = imageCarouselList;
  }
  set setImageCarouselItem(imageCarouselItem: QueryList<any>) {
    this.imageCarouselItem = imageCarouselItem;
  }
  set setAutoTimer(ms: number){
    this.autoTimer = ms
  }
  get getCarouselItemIdx(){
    return this.carouselItemIdx
  }
  activeCarousel(ms: number){
    this.setAutoTimer = ms
    this.carouselIntervalId =  setInterval(() => {
      this.processCarousel("+")
    }, ms)
  }
  
}
