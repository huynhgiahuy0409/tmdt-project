import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarouselService } from 'src/app/shared/services/carousel.service';

@Component({
  selector: 'app-top-search-carousel',
  templateUrl: './top-search-carousel.component.html',
  styleUrls: ['./top-search-carousel.component.scss']
})
export class TopSearchCarouselComponent implements OnInit {
  @Input()
  itemList: any[] = [];
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  sltIdx!: number
  lastIdx!: number
  isLastIdx = false
  constructor(public carouselService: CarouselService) { }
  ngOnInit(): void {
    this.carouselService.curIdx$.subscribe(value => {
      if(this.carouselService.isConstructView){
        this.carouselService.processCarousel(value)
      }
    })
  }
  ngAfterViewInit() {
    this.carouselService.initCarousel(
      this.imageCarouselList,
      this.imageCarouselItem
    );
    this.lastIdx = this.carouselService.lastIdx
  }
  processCarousel(action: '+' | '-') {
    this.sltIdx = this.carouselService.getValueCurIdxSub();
    action === '+'? this.sltIdx++ : this.sltIdx--
    this.isLastIdx = this.sltIdx === this.lastIdx ? true : false
    this.carouselService.nextCurIdxSubject(this.sltIdx);
  }
}
