import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.count("Huy","HuynhGiaHuyasdasdasdHuyasdasdsDSaddHuy"))
  }
  count(a: string, b: string){
    let count = 0;
    let aLenth = a.length;
    let index = 0;
    while(b.length !== 0){
      let currentIndex = b.indexOf(a)
      if(currentIndex != -1){
        count++;
        index = currentIndex + aLenth
        b = b.substring(index)
      }
    } 
    return count;
  }
}
