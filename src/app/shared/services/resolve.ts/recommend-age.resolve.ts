import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { RecommendAgeService } from 'src/app/shared/services/recommend-age.service';
import {
  CategoryResponse,
  RecommendAgeResponse,
} from 'src/app/_models/response';
import { CategoryService } from '../category.service';

@Injectable()
export class RecommendAgeResolve implements Resolve<RecommendAgeResponse[]> {
  constructor(private recommendAgeService: RecommendAgeService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<RecommendAgeResponse[]> {
    return this.recommendAgeService.findPagination({ pageIndex: 0, pageSize: 10 });
  }
}
