import { Size } from "./request";

interface BaseResponse {
  id?: number;
  name: string;
  code: string;
}
export interface Image {
  url: string;
}
export interface CategoryResponse extends BaseResponse {}
export interface BrandResponse extends BaseResponse {
  logo: Image
}
export interface RecommendAgeResponse extends BaseResponse {}
export interface MaterialResponse extends BaseResponse {}
export interface OriginResponse extends BaseResponse {}
export interface StatusResponse extends BaseResponse {}


export interface ProductResponse {
  id: number;
  name: string;
  sku: string;
  description: string;
  sourcePrice: number;
  discountPercent: number;
  buyPrice: number;
  repository: number;
  origin: OriginResponse;
  status: StatusResponse;
  images: Image[];
  category: CategoryResponse;
  material: MaterialResponse;
  brand: BrandResponse;
  recommend: RecommendAgeResponse;
  size: Size;
}
