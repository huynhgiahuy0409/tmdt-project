import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  star:any;
  constructor() { }

  ngOnInit(): void {
    this.star =[1,2,3,4,5,6]
  }

}
