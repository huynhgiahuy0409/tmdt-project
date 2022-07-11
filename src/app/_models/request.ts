export interface Product{
    name: string,
    SKU: string,
    description: number,
    sourcePrice: string,
    discountPercent: number,
    repository: number,
    size: Size,
    originCode: string,
    statusCode: string,
    categoryCode: string,
    materialCode: string,
    brandCode: string,
    recommendAgeCode: string,
}
export interface Size{
    weight: number,
    length: number,
    width: number,
    height: number,
}
export interface ProductRequest{
    files: File,
    product: Product
}
export interface PendingItemRequest{
    productId: number,
    quantity: number
}
export interface AddressRequest{
    fullName: string,
    phoneNumber: string,
    detailAddress: string,
    wardId: number,
    districtId: number,
    provinceId: number,
    status: number
}
export interface OrderItemRequest{
    productId: number,
    quantity: number
}
export interface OrderRequest{
    orderItems: OrderItemRequest[],
    shopId: number,
    sendBy: string,
    orderBy: string,
    status: string,
    sendPhoneNumber: string,
    orderPhoneNumber: string,
    orderAddress: string,
    sendAddress: string,
    cartItemCost: number,
    shippingCost: number,
    paymentCost: number,
    paymentStatus: string,
    paymentMethod: string,
}