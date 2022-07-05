import { JWT } from "../buyer/model/jwt";
import { Size } from "./request";

interface BaseResponse {
  id?: number;
  name: string;
  code: string;
}
export interface Image {
  url: string;
}
export interface CategoryResponse extends BaseResponse { }
export interface BrandResponse extends BaseResponse {
  logo: Image
}
export interface RecommendAgeResponse extends BaseResponse { }
export interface MaterialResponse extends BaseResponse { }
export interface OriginResponse extends BaseResponse { }
export interface StatusResponse extends BaseResponse { }
export interface ProvinceResponse extends BaseResponse {
  domain: "Bắc" | "Trung" | "Nam"
}
export interface DistrictResponse extends BaseResponse {
  prefix: string
}
export interface WardResponse extends BaseResponse {
  prefix: string
}
export interface ShopResponse {
  id: number
  name: string,
  avatar: Image,
  shopUser: UserResponse
  products: ProductResponse[]
}
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
export interface AddressResponse {
  id: number,
  fullName: string,
  phoneNumber: string,
  detailAddress: string,
  ward: WardResponse,
  district: DistrictResponse,
  province: ProvinceResponse,
  status: number
}
export interface UserResponse {
  id: number,
  name: number,
  username: string,
  fullName: string,
  gender: string,
  email: string,
  phoneNumber: string,
  addresses: AddressResponse[]
  role: string;
  cart: CartResponse;
  shop: ShopResponse;
  publicKeyFilename: string,
}
export interface AuthenticationResponse {
  user: UserResponse;
  accessToken: JWT;
  refreshToken: JWT
}
export interface CartResponse {
  id: number;
  cartItems: CartItemResponse[];
}
export interface CartItemResponse {
  id: number;
  pendingItems: PendingItemResponse[];
  shop: ShopResponse;
}
export interface PendingItemResponse {
  id: number,
  product: ProductResponse,
  quantity: number
}
export interface OrderItemResponse {
  product: ProductResponse,
  quantity: number
}
export interface OrderResponse {
  id: number;  
  createdDate: Date
  orderItems: OrderItemResponse[],
  status: string,
  shopId: number,
  sendBy: string,
  orderBy: string,
  sendPhoneNumber: string,
  orderPhoneNumber: string,
  orderAddress: string,
  sendAddress: string,
  cartItemCost: number,
  shippingCost: number,
  paymentCost: number,
  paymentMethod: string,
  digitBillFilename: string
  digitalBillHash: string
}

