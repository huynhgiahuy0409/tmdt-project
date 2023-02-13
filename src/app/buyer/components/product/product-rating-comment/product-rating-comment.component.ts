import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-rating-comment',
  templateUrl: './product-rating-comment.component.html',
  styleUrls: ['./product-rating-comment.component.scss'],
})
export class ProductRatingCommentComponent implements OnInit, OnChanges{
  comment = {
    images: [1,1,1,1,1]
  }
  isZoomedRatingImage: boolean = false;
  sltRatingImageIdx!: number;
  @ViewChild('productRatingMediaCarousel', {static: false})
  productRatingMediaCarousel!: ElementRef
  constructor(private changeDetector : ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
  }
  selectRatingCommentImage(imageIdx: number) {
    if(this.isZoomedRatingImage === true && this.sltRatingImageIdx === imageIdx){
      this.isZoomedRatingImage = false;
      this.sltRatingImageIdx = -1
    }else if(this.isZoomedRatingImage === true && this.sltRatingImageIdx !== imageIdx){
      this.sltRatingImageIdx = imageIdx
    }else if(this.isZoomedRatingImage === false){
      this.isZoomedRatingImage = true
      this.sltRatingImageIdx = imageIdx
    }
  }
  addNewSltRatingImgIdxEvent(event: any){
    this.sltRatingImageIdx = event
  }
}
