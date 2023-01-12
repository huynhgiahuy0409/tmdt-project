import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CarouselService } from '../carousel.service';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit, AfterViewInit {
  @Input()
  carouselItem!: any
  @ViewChild('imageCarouselItem')
  imageCarouselItem!: ElementRef
  @ContentChild('header',{static: true}) headerTemplateRef!: TemplateRef<any>;
  constructor() { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }
  
}