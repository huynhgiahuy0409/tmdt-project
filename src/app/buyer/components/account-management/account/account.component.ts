import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: [string,string,string]
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',action: ["Xem","Huỷ","Đặt lại"]},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',action: ["Xem","Huỷ","Đặt lại"]},
];
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router) {
    console.log(router.url)
    console.log(router)
   }

  ngOnInit(): void {
  }

}
