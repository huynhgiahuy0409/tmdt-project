import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DIRECT_LINK_IMAGE } from 'src/app/_models/constance';
import { SummaryCart } from 'src/app/_models/models';
import { AddressResponse, CartItemResponse, UserResponse } from 'src/app/_models/response';
import { AddressService } from '../../services/address.service';
import { CartService } from '../../services/cart.service';
import { ShippingService } from '../../services/shipping.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  directLinkImage = `${DIRECT_LINK_IMAGE}/`;
  sumCart$!: Observable<SummaryCart | null>
  user$!: Observable<UserResponse | null>
  sltAddressId!: number
  isChangeAddress: boolean = false
  constructor(private cartService: CartService, private shippingService: ShippingService, private userService: UserService, private addressService: AddressService) {
    this.sumCart$ = cartService.sumCart$
    this.user$ = userService.user$
  }
  ngOnInit(): void {
    let user = this.userService.userBehaviorSubject.value
    this.sltAddressId = user!.addresses.find(address => address.status === 1)!.id
  }
  getSummaryCartItem(cartItem: CartItemResponse): number {
    let result = 0
    cartItem.pendingItems.forEach(pendingItem => {
      result += pendingItem.product.buyPrice * pendingItem.quantity
    })
    return result
  }
  saveSltAddress() {
    let user = this.userService.userBehaviorSubject.value
    let addressResponse: AddressResponse | undefined = user!.addresses.find(address => address.id === this.sltAddressId)
    if (addressResponse) {
      user?.addresses.map(address => address.status = 0)
      addressResponse.status = 1
      this.addressService.editAddress(addressResponse, user!.id).subscribe()
    }
    this.userService.userBehaviorSubject.next(user)
    this.isChangeAddress = false
  }
}
