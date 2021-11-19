import { Component, OnInit } from '@angular/core';
import {CheckBoxs} from "./CheckBoxs";
import {Product} from "./Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  checkboxes: CheckBoxs[] = [];
  pro1: Product[] = [];
  pro2: Product[] = [];
  totalPrice: number = 0;
  // allComplete: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.pro1.push(new Product("Pro 1"))
    this.pro1.push(new Product("Pro 2"))
    this.pro1.push(new Product("Pro 3"))
    this.pro2.push(new Product("Pro 1"))
    this.pro2.push(new Product("Pro 2"))
    this.pro2.push(new Product("Pro 3"))
    this.checkboxes.push(new CheckBoxs(this.pro1));
    this.checkboxes.push(new CheckBoxs(this.pro2));
    this.checkboxes.forEach(vl =>(this.totalPrice +=vl.currentPrice));
  }
  updateAllComplete(c:CheckBoxs, p: Product, i:boolean) {
    p.checked=i;
    c.allComplete = c.products != null && c.products.every(value => value.checked);
    c.currentPrice = c.computeTotalCheckecPrice();
    this.changeCheckboxTotalPrice(c);
  }

  someComplete(c:CheckBoxs): boolean {
    if (c.products == null) {
      return false;
    }
    return c.products.filter(t => t.checked).length > 0 && !c.allComplete;
  }

  setAll(completed: boolean, c:CheckBoxs) {
    c.allComplete = completed;
    if (c.products == null) {
      return;
    }
    c.products.forEach(t => (t.checked = completed));
    c.currentPrice = completed? c.totalPrice: 0;
    this.changeCheckboxTotalPrice(c);
  }

  changeCheckboxTotalPrice(c:CheckBoxs){
    this.totalPrice =0;
    this.checkboxes.forEach(vl =>(this.totalPrice +=vl.currentPrice))
    var totalPrice =document.getElementById("totalPrice");
    totalPrice!.innerText = "$" + this.totalPrice;
  }

  changeProductQuantities(c: CheckBoxs, p:Product, vl: any){
    c.currentPrice = c.currentPrice -(p.price*p.quantities) + (p.price*vl.target.value);
    p.quantities =vl.target.value;
    c.totalPrice=c.computeTotalPrice();
    if (p.checked){
      this.changeCheckboxTotalPrice(c);
    }
  }

}
