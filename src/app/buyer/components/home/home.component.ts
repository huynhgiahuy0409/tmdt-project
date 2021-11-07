import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: number[][] = []
  constructor() { }

  ngOnInit(): void {
    let arrayElement: number[] = []
    for (let index = 1; index <= 20; index++) {
      let length = arrayElement.push(index)
      console.log("length", length)
      if((index % 4) === 0 && index >= 4){
        length = this.products.push(arrayElement)
        arrayElement = []
        console.log("---", length)
      }
    }
  }

}
