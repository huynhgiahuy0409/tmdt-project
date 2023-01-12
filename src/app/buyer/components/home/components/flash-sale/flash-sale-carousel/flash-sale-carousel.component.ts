import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarouselService } from 'src/app/shared/services/carousel.service';

@Component({
  selector: 'app-flash-sale-carousel',
  templateUrl: './flash-sale-carousel.component.html',
  styleUrls: ['./flash-sale-carousel.component.scss'],
  providers: [CarouselService]
})
export class FlashSaleCarouselComponent implements OnInit {
  @Input()
  itemList: any[] = [];
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  constructor(public carouselService: CarouselService) { }
  ngAfterViewInit(){
    this.carouselService.setImageCarouselItem = this.imageCarouselItem
    this.carouselService.setImageCarouselList = this.imageCarouselList
  }
  ngOnInit(): void {
  }

}
