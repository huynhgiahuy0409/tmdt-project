import { ShippingCost } from './../buyer/services/shipping.service';
import { CartItemResponse, CartResponse } from "./response";

export interface SummaryCart{
    cartId: number,
    summaryCartItems: SummaryCartItem[],
    totalCartItem: number,
    totalShipCost: number,
    totalPayment: number
}
export interface Shipping{
    type: 'standard' | 'fast'
    cost: ShippingCost
}
export interface SummaryCartItem{
    cartItem: CartItemResponse;
    shipping: Shipping;
    totalPayment: number
}