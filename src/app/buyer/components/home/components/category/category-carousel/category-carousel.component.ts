import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarouselService } from 'src/app/shared/services/carousel.service';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss'],
  providers: [CarouselService]
})
export class CategoryCarouselComponent implements OnInit {
  @Input()
  itemList: any[] = [];
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  constructor(public carouselService: CarouselService) {
  }
  
  ngOnInit(): void {}
  ngAfterViewInit(){
    this.carouselService.setImageCarouselList = this.imageCarouselList
    this.carouselService.setImageCarouselItem = this.imageCarouselItem
  }
  
}
