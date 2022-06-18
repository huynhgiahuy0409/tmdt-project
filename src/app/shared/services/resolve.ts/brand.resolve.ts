import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BrandService } from 'src/app/shared/services/brand.service';
import { BrandResponse, CategoryResponse } from 'src/app/_models/response';

@Injectable()
export class BrandResolve implements Resolve<BrandResponse[]> {
  constructor(private brandService: BrandService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<BrandResponse[]> {
    return this.brandService.findPagination({ pageIndex: 0, pageSize: 10 });
  }
}
