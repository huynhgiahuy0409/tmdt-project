import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { CarouselService } from '../carousel.service';

@Component({
  selector: 'app-carousel-list',
  templateUrl: './carousel-list.component.html',
  styleUrls: ['./carousel-list.component.scss']
})
export class CarouselListComponent implements OnInit, AfterViewInit{
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren(CarouselItemComponent)
  imageCarouselItem!: QueryList<CarouselItemComponent>;
  categories: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  categoriesView: number[][] = [];
  constructor(private __carouselService: CarouselService) {
    this.customizeCategories()
  }
  ngAfterViewInit(): void {
    this.__carouselService.setSliderItemWidth(this.imageCarouselItem.first.imageCarouselItem.nativeElement.offsetWidth)
    this.__carouselService.setSliderListWidth(this.imageCarouselList.nativeElement.offsetWidth)
    this.__carouselService.setTotalSliderItem(this.imageCarouselItem.length)
  }

  ngOnInit(): void {
    this.__carouselService.positionX$.subscribe(value => {
      console.log(value);
      
        this.imageCarouselList.nativeElement.style.transform = `translateX(-${value}%)`;
    })
  }
  private customizeCategories() {
    let arrTemp: number[] = [];
    this.categories.forEach((c, idx) => {
      arrTemp.push(c);
      if (arrTemp.length === 2) {
        this.categoriesView.push(arrTemp);
        arrTemp = [];
      }
    });
    if (this.categories.length % 2 != 0) {
      this.categoriesView.push(arrTemp);
    }
  }
}
