import { DIRECT_LINK_IMAGE } from 'src/app/_models/constance';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse, ShopResponse } from 'src/app/_models/response';
import { ShopService } from 'src/app/seller/services/shop.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  directLinkImage = `${DIRECT_LINK_IMAGE}/`
  shop$!: Observable<ShopResponse | null>
  recommendProduct$!: Observable<ProductResponse[] | null>
  constructor(private activeRoute: ActivatedRoute, private shopService: ShopService, private productService: ProductService) {
    let shopId = activeRoute.snapshot.params.id
    this.shop$ = this.shopService.findShopById(shopId)
    this.recommendProduct$ = this.productService.findProducts({
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        sorter: {
          dir: "desc",
          order: "view",
        }
      }
    })
    this.recommendProduct$.subscribe(v => console.log(v));
  }

  ngOnInit(): void {
  }

}
