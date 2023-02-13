import { BehaviorSubject, Observable } from 'rxjs';
import {
  ElementRef,
  Injectable,
  OnInit,
  QueryList,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarouselService implements OnInit {
  isConstructView: boolean = false;
  private carouselList!: ElementRef<HTMLUListElement>;
  private carouselItems!: QueryList<any>;
  curIdx = 0;
  lastIdx!: number;
  isLastIdx: boolean = false;
  private carouselIntervalId!: number;
  nextCarouselTime: number = 5000;
  private totalItem: number = 0;
  private curIdxSubject!: BehaviorSubject<number>;
  curIdx$: Observable<number>;
  private timer!: number
  private remainderItemWidth: number = 0
  nextCurIdxSubject(value: number) {
    this.curIdxSubject.next(value);
  }
  getValueCurIdxSub(): number {
    return this.curIdxSubject.value;
  }

  constructor() {
    this.curIdxSubject = new BehaviorSubject<number>(0);
    this.curIdx$ = this.curIdxSubject.asObservable();
  }
  ngOnInit(): void {}
  initCarousel(
    imageCarouselList: ElementRef<HTMLUListElement>,
    imageCarouselItem: QueryList<any>,
    ms?: number
  ) {
    this.isConstructView = true;
    this.carouselList = imageCarouselList;
    this.carouselItems = imageCarouselItem;
    this.totalItem = this.carouselItems.length;
    if(ms){
      this.timer = ms
      this.carouselIntervalId = setInterval(() => {
        this.curIdx++
        this.processCarousel(this.curIdx)
      }, ms)
    }
    this.recomputeResponsive()
  }
  processCarousel(sltIdx: number) {
     this.recomputeResponsive()
    if (sltIdx < 0) {
      this.curIdx = this.lastIdx;
    } else if (sltIdx > this.lastIdx) {
      this.curIdx = 0;
    } else {
      this.curIdx = sltIdx;
    }
    let isAuto = false;
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
      isAuto = true;
    }
    let positionX = -this.curIdx * 100;
    if (this.curIdx === this.lastIdx) {
      if (this.remainderItemWidth != 0) {
        positionX = -(this.curIdx - 1) * 100;
        this.carouselList.nativeElement.style.transform = `translateX(calc(${positionX}% - ${this.remainderItemWidth}px))`;
      } else {
        this.carouselList.nativeElement.style.transform = `translateX(${positionX}%)`;
      }
    } else {
      this.carouselList.nativeElement.style.transform = `translateX(${positionX}%)`;
    }
    if (isAuto) {
      this.carouselIntervalId = setInterval(() => {
        this.curIdx++
        this.processCarousel(this.curIdx)
      }, this.timer)
    }
  }
  isCarouselListExist(): boolean {
    return this.carouselList ? true : false;
  }
  isCarouselItemExist(): boolean {
    return this.carouselItems ? true : false;
  }
  get getCurIdx(){
    return this.curIdx
  }
  recomputeResponsive(){
    let listWidth = this.carouselList.nativeElement.offsetWidth;
    let itemWidth = this.carouselItems.first.nativeElement.offsetWidth;
    let totalListWidth = itemWidth * this.totalItem;
    this.remainderItemWidth = totalListWidth % listWidth;
    let partNumber = Math.floor(totalListWidth / listWidth);
    this.lastIdx = this.remainderItemWidth === 0 ? partNumber - 1 : partNumber;
  }
}
