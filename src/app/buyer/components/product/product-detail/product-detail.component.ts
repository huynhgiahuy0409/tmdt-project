import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/buyer/services/product.service';
import { CartResponse, ProductResponse } from 'src/app/_models/response';
import { map } from 'rxjs/operators';
import { DIRECT_LINK_IMAGE } from 'src/app/_models/constance';
import { CartService } from 'src/app/buyer/services/cart.service';
import { PendingItemRequest } from 'src/app/_models/request';
import { DialogService } from 'src/app/buyer/services/dialog.service';
import { UserService } from 'src/app/buyer/services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  sltImageIdx: number = 0
  product$!: Observable<ProductResponse>;
  productId!: number
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = Number.parseInt(this.activatedRoute.snapshot.url[0].path);
    this.product$ = this.productService.findOne(this.productId).pipe(
      tap(product => product.images.map(image => image.url = DIRECT_LINK_IMAGE + "/" + image.url))
    );
    this.product$.subscribe(v => { console.log(v) })
  }
  onClickImage(idx: number) {
    this.sltImageIdx = idx
  }
  onClickBuyNow() {
    if (!this.userService.userBehaviorSubject.value) {
      this.router.navigate(['/login'])
    } else {

    }
  }
  onClickAddToCart(quantityTemplateVar: any) {
    if (!this.userService.userBehaviorSubject.value) {
      this.router.navigate(['/buyer/login'])
    } else {
      const cartId: number = this.cartService.cartBehaviorSubject.value!.id
      const pendingItem: PendingItemRequest = {
        productId: this.productId,
        quantity: Number.parseInt(quantityTemplateVar.value)
      }
      this.cartService.flushCart(cartId,pendingItem).subscribe((cartResponse: CartResponse) => {
        this.cartService.cartBehaviorSubject.next(cartResponse)
        this.dialogService.openDialog('500ms', '50ms', {
          title: 'Thêm thành công',
          content: 'Đã thêm sản phẩm vào giỏ hàng',
          action: [{ path: '/buyer/payment', title: "Thanh toán ngay" },{ path: '/buyer/cart', title: "Xem giỏ hàng" }]
        })
      })
    }
  }
}
