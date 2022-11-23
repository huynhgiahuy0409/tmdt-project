import { DIRECT_LINK_IMAGE } from './../../../../_models/constance';
import { map, tap } from 'rxjs/operators';
import { ProductFilterChainService } from './../../../../buyer/services/product-filter-chain.service';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/buyer/services/auth.service';
import { ProductService } from 'src/app/buyer/services/product.service';
import { UserService } from 'src/app/buyer/services/user.service';
import { CartService } from 'src/app/buyer/services/cart.service';
import { Router } from '@angular/router';
import {
  CartItemResponse,
  CartResponse,
  UserResponse,
} from 'src/app/_models/response';
import { CookieService } from 'ngx-cookie-service';
import { ShopService } from 'src/app/seller/services/shop.service';
interface SidebarNode {
  label: string;
  icon?: string;
  expanded?: boolean;
  children?: SidebarNode[];
}
@Component({
  selector: 'customer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class CustomerHeaderComponent implements OnInit {
  mobileSidebar: SidebarNode[] = [
    {
      label: 'Về người bán',
      icon: 'fa-solid fa-user-tie',
      expanded: false,
      children: [
        {
          label: 'Kênh người bán',
        },
        {
          label: 'Trở thành người bán',
        },
      ],
    },
    {
      label: 'Về chúng tôi',
      icon: 'fa-brands fa-weebly',
      expanded: false,
      children: [
        {
          label: 'Kết nối',
        },
        {
          label: 'Tải ứng dụng',
        },
      ],
    },
    {
      label: 'Ngôn ngữ',
      icon: 'fa-solid fa-earth-americas',
      expanded: false,
    },
    {
      label: 'Đăng ký',
      icon: 'fa-solid fa-pen-to-square',
      expanded: false,
    },
    {
      label: 'Đăng nhập',
      icon: 'fa-solid fa-right-to-bracket',
      expanded: false,
    },
    {
      label: 'Hỗ trợ',
      icon: 'fa-regular fa-circle-question',
      expanded: false,
    },
  ];
  categories: string[] = [
    'Đồ chơi sáng tạo',
    'Đồ chơi phương tiện',
    'Robot',
    'Đồ chơi mô phỏng',
    'Đồ chơi mầm non',
  ];
  user$!: Observable<UserResponse | null>;
  cart$!: Observable<CartResponse | null>;
  totalPendingItem: number = 10;
  searchValue!: string;
  directLinkImage = `${DIRECT_LINK_IMAGE}/`;
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private authService: AuthService,
    private cookieService: CookieService,
    private productFilterChainService: ProductFilterChainService,
    private shopService: ShopService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.user$ = userService.user$;
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
  ngOnInit(): void {}
  logout() {
    this.authService
      .logout()
      .pipe(
        map((value) => {
          return value != -1 ? true : false;
        })
      )
      .subscribe((isLogout) => {
        if (isLogout) {
          this.userService.userBehaviorSubject.next(null);
          this.authService.accessTokenBehaviorSubject.next(null);
          this.cartService.cartBehaviorSubject.next(null);
          this.cookieService.delete('refresh-token', '/');
          this.authService.stopRefreshTokenTimer();
          this.router.navigate(['/buyer/home']);
        }
      });
  }
  searchProductByName(searchValue: string) {
    console.log(searchValue);

    let currFilter = this.productFilterChainService.filterBSub.value;
    currFilter.pagination.pageIndex = 0;
    currFilter.name = searchValue;
    this.productFilterChainService.filterBSub.next(currFilter);
    this.shopService.searchShopBehaviorSubject.next(searchValue);
    this.router.navigate(['/buyer/product']);
  }
}
