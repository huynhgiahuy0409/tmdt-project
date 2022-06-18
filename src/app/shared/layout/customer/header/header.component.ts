import { ProductFilterChainService } from './../../../../buyer/services/product-filter-chain.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/buyer/model/user';
import { AuthService } from 'src/app/buyer/services/auth.service';
import { ProductService } from 'src/app/buyer/services/product.service';
import { UserService } from 'src/app/buyer/services/user.service';
@Component({
  selector: 'customer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class CustomerHeaderComponent implements OnInit {
  user$!: Observable<User | null>;
  searchValue!: string;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private productFilterChainService: ProductFilterChainService
  ) {
    this.user$ = userService.user$;
  }
  ngOnInit(): void {}
  logout() {
    this.authService.logout().subscribe();
  }
  searchProductByName(searchValue: string) {
    let currFilter = this.productFilterChainService.filterBSub.value;
    currFilter.pagination.pageIndex = 0;
    currFilter.name = searchValue;
    this.productFilterChainService.filterBSub.next(currFilter);
  }
}
