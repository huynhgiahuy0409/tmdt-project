import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/buyer/services/user.service';
import { ShopResponse, UserResponse } from 'src/app/_models/response';
@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  shop!: ShopResponse
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.user$.subscribe((user: UserResponse | null) => {
      if(user){
        this.shop = user!.shop
      }
    })
  }
}

