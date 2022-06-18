import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/buyer/services/product.service';
import { ProductResponse } from 'src/app/_models/response';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<ProductResponse>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId: string = this.activatedRoute.snapshot.url[0].path;
    this.product$ = this.productService.findOne(Number.parseInt(productId));
  }
}
