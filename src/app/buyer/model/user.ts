import { Address, Cart } from "src/app/_models/models";

export interface User{
    id: number,
    name: number,
    username: string,
    fullName: string,
    gender: string,
    email: string,
    phoneNumber: string,
    role: string;
    cart: Cart;
    addresses: Address[]
}