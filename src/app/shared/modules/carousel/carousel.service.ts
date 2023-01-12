import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private sliderListWidth!: number
  private sliderItemWidth!: number
  private totalSliderItem!: number
  private positionXSub!: Subject<number>
  positionX$!: Observable<number>
  constructor() {
    this.positionXSub = new Subject()
    this.positionX$  = this.positionXSub.asObservable()
  }
  setSliderItemWidth(width: number){
    this.sliderItemWidth = width
  }
  setSliderListWidth(width: number){
    this.sliderListWidth = width
  }
  setTotalSliderItem(length: number){
    this.totalSliderItem = length
  }
  getSliderItemWidth(): number{
    return this.sliderItemWidth
  }
  getSliderListWidth(){
    return this.sliderListWidth
  }
  getTotalSliderItem(){
    return this.totalSliderItem
  }
  nextPositionXSub(value: number){
    this.positionXSub.next(value)
  }
}
