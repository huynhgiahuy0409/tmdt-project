import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { CarouselService } from 'src/app/shared/services/carousel.service';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss'],
  providers: [CarouselService],
})
export class CategoryCarouselComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input()
  itemList: any[] = [];
  @ViewChild('imageCarousel', { static: true })
  imageCarousel!: ElementRef<HTMLDivElement>;
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  sltIdx: number = 0;
  lastIdx!: number
  isLastIdx: boolean = false
  @Input()
  values!: number[]
  @Output()
  valueChange = new EventEmitter()
  valueInput: string = 'abc'
  @Input()
  number!: number
  constructor(public carouselService: CarouselService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.carouselService.curIdx$.subscribe(value => {
      if(this.carouselService.isConstructView){
        console.log(value);
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
    this.sltIdx = this.carouselService.curIdx
    action === '+'? this.sltIdx++ : this.sltIdx--
    this.isLastIdx = this.sltIdx === this.lastIdx ? true : false
    this.carouselService.processCarousel(this.sltIdx)
  }
  changeValue(value: string){
    this.valueChange.emit(value)
  }
}
