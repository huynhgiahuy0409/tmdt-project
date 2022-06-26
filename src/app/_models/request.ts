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