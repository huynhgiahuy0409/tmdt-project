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
  providers: [CarouselService]
})
export class BannerCarouselComponent implements OnInit {
  @Input()
  itemList: any[] = [];
  @Input()
  carouselDotsActive: boolean = false
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  constructor(public carouselService: CarouselService) {
  }
  ngAfterViewInit(){
    this.carouselService.setImageCarouselItem = this.imageCarouselItem
    this.carouselService.setImageCarouselList = this.imageCarouselList
    this.carouselService.activeCarousel(1000)
  }

  ngOnInit(): void {}
  
}
