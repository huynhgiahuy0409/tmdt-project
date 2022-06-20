import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  sltSidebarItemIdx: number = 0
  sidebarLabels: [string, string][] = [
    ['Tài khoản', 'account'],
    ['Lịch sử mua hàng', 'purchase-history'],
    ['Danh sách yêu thích', 'wishlist'],
    ['Địa chỉ giao hàng', 'delivery-address'],
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
