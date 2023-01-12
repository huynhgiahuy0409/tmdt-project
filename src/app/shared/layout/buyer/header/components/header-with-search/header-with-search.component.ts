import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/buyer/services/cart.service';
import { CartItemResponse, CartResponse } from 'src/app/_models/response';

@Component({
  selector: 'app-header-with-search',
  templateUrl: './header-with-search.component.html',
  styleUrls: ['./header-with-search.component.scss']
})
export class HeaderWithSearchComponent implements OnInit {
  categories: string[] = [
    'Đồ chơi sáng tạo',
    'Đồ chơi phương tiện',
    'Robot',
    'Đồ chơi mô phỏng',
    'Đồ chơi mầm non',
  ];
  cart$!: Observable<CartResponse | null>;
  totalPendingItem: number = 10;
  searchValue!: string;
  constructor(private cartService: CartService) { 
    this.cart$ = cartService.cart$;
    this.cart$.subscribe((cart) => {
      this.totalPendingItem = 0;
      let cartItems: CartItemResponse[] | undefined = cart?.cartItems;
      if (cartItems) {
        cartItems.forEach((cartItem) => {
          let pendingItemLength: number = cartItem.pendingItems.length;
          this.totalPendingItem += pendingItemLength;
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
