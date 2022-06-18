import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/buyer/services/product.service';
import { CategoryResponse, ProductResponse } from 'src/app/_models/response';

@Injectable()
export class ProductResolve implements Resolve<ProductResponse[]> {
  constructor(private productService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ProductResponse[]> {
    return this.productService.findAll();
  }
}