import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.scss']
})
export class TopSearchComponent implements OnInit {
  topSearchProducts: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
