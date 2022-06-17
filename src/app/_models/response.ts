interface BaseResponse {
  name: string;
  code: string;
}
interface Image {
  url: string;
}
export interface CategoryResponse extends BaseResponse {}
export interface BrandResponse extends BaseResponse {}
export interface RecommendAgeResponse extends BaseResponse {}
export interface MaterialResponse extends BaseResponse {}
export interface OriginResponse extends BaseResponse {}
export interface StatusResponse extends BaseResponse {}
export interface ProductResponse {
  id: number;
  name: string;
  SKU: string;
  description: string;
  sourcePrice: number;
  discountPercent: number;
  repository: number;
  origin: OriginResponse;
  status: StatusResponse;
  images: Image[];
  category: CategoryResponse;
  material: MaterialResponse;
  brand: BrandResponse;
  recommend: RecommendAgeResponse;
}
