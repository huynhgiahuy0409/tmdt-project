import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CarouselService } from 'src/app/shared/services/carousel.service';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss'],
  providers: [CarouselService],
})
export class BannerCarouselComponent implements OnInit {
  @Input()
  itemList: any[] = [];
  @Input()
  carouselDotsActive: boolean = false;
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  sltIdx: number = 0;
  lastIdx!: number
  isLastIdx: boolean = false
  constructor(public carouselService: CarouselService) {
  }
  ngAfterViewInit() {
    this.carouselService.initCarousel(
      this.imageCarouselList,
      this.imageCarouselItem,
      2000
    );
  }
  ngOnInit(): void {
    this.carouselService.curIdx$.subscribe(value => {
      if(this.carouselService.isConstructView){
        this.carouselService.processCarousel(value)
      }
    })
  }
  processCarousel(action: '+' | '-') {
    this.sltIdx = this.carouselService.curIdx
    action === '+'? this.sltIdx++ : this.sltIdx--
    this.isLastIdx = this.sltIdx === this.lastIdx ? true : false
    this.carouselService.processCarousel(this.sltIdx)
  }
  sltDotCarousel(idx: number) {
    this.carouselService.processCarousel(idx)
  }
}
