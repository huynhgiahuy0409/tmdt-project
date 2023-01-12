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
  constructor(public carouselService: CarouselService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.carouselService.setImageCarouselItem = this.imageCarouselItem
    this.carouselService.setImageCarouselList = this.imageCarouselList
  }
  
}
