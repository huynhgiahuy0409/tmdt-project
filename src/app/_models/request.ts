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