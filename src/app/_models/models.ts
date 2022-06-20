import { Image } from "./response";
export interface Cart{
    pendingOrders: PendingItem[]
}
export interface PendingProductResponse{
    id: number;
    name: string;
    sourcePrice: number;
    buyPrice: number;
    images: Image[]
}
export interface PendingItem{
    product: PendingProductResponse;
    quantity: number
}
export interface Address{
    fullName: string,
    phoneNumber: string,
    detailAddress: string,
    ward: string,
    district: string,
    province: string,
    isDefault: boolean
}