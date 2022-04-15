interface BaseResponse {
  name: string;
  code: string;
}
export interface CategoryResponse extends BaseResponse {}

export interface BrandResponse extends BaseResponse {}
export interface RecommendAgeResponse extends BaseResponse {}
export interface MaterialResponse extends BaseResponse {}
