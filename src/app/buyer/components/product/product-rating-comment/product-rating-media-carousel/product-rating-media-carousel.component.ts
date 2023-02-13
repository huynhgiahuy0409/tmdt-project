import { LoginComponent } from './../../../login/login.component';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CarouselService } from 'src/app/shared/services/carousel.service';

@Component({
  selector: 'app-product-rating-media-carousel',
  templateUrl: './product-rating-media-carousel.component.html',
  styleUrls: ['./product-rating-media-carousel.component.scss'],
  providers: [CarouselService]
})
export class ProductRatingMediaCarouselComponent implements OnInit, OnChanges {
  @Input()
  productRatingMedias!: number[] 
  @Input()
  itemList: any[] = [];
  @Input()
  carouselDotsActive: boolean = false
  @ViewChild('imageCarouselList', { static: false })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  @Input()
  sltRatingImageIdx!: number
  @Output()
  newSltRatingImgIdxEvent = new EventEmitter<number>();
  constructor(public carouselService: CarouselService,private changeDetector : ChangeDetectorRef) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.carouselService.nextCurIdxSubject(this.sltRatingImageIdx)
  }
  ngOnInit(): void {
    this.carouselService.curIdx$.subscribe(value => {
      if(value){
        this.carouselService.processCarousel(value)
      }      
    })
  }
  ngAfterViewInit(){
    this.carouselService.initCarousel(this.imageCarouselList, this.imageCarouselItem)
  }
  processCarousel(action: '+' | '-'){
    let currIdx = this.carouselService.getValueCurIdxSub()
    if(currIdx != undefined){
      if(action === '+'){
        currIdx++
      }else{
        currIdx--
      }
      this.carouselService.nextCurIdxSubject(currIdx)
    }
  }
}
