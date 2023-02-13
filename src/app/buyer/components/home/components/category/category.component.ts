import { filter } from 'rxjs/operators';
import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { TimeScale } from 'chart.js';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit{
  categories: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
  categoriesView: number[][] = [];
  values: number[] = [1,2,3]
  number = 0
  constructor() {
    
    this.customizeCategories();
    console.log(this.categoriesView.length);
  }
  ngOnInit(): void {
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
  incr(){
    this.number++
  }
}
