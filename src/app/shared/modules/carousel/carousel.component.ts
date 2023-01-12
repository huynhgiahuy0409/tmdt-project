import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  @ViewChild('carouselArrowPrev', { static: true })
  carouselArrowPrev!: ElementRef;
  @ViewChild('carouselArrowNext', { static: true })
  carouselArrowNext!: ElementRef;
  constructor() { }
  ngAfterViewInit(): void {
    console.log(this.imageCarouselList);
    
  }

  ngOnInit(): void {
  }

}
