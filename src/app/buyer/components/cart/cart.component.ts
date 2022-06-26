import { DIRECT_LINK_IMAGE } from './../../../_models/constance';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartResponse } from 'src/app/_models/response';
import { CartService } from '../../services/cart.service';
import {CheckBoxs} from "./CheckBoxs";
import {Product} from "./Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  directLinkImage = `${DIRECT_LINK_IMAGE}/`
  cart$!: Observable<CartResponse | null>
  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$
  }

  ngOnInit(): void {
    
  }

}
