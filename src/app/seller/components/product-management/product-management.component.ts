import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/buyer/services/user.service';
import { ShopResponse } from 'src/app/_models/response';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'product-management',
  templateUrl: './product-management.component.html',
})
export class ProductManagementComponent implements OnInit{
  constructor(private shopService: ShopService, private userService: UserService) {
  }
  ngOnInit(): void {
    this.shopService.findShopByUserId(this.userService.userBehaviorSubject.value!.id).subscribe(rs => {
      console.log(rs)
    })
  }
}
