import {Product} from "./Product";
import {each} from "chart.js/helpers";

export class CheckBoxs{
  checked: boolean = false;
  image: string = "";
  name: string = "shop adsf"
  products: Product[];

  totalPrice: number =0;
  currentPrice: number =0;
  allComplete: boolean = false;

  constructor(p: Product[]) {
    this.products = p;
    this.totalPrice = this.computeTotalPrice();
    this.currentPrice = this.computeTotalCheckecPrice();
  }

  computeTotalPrice(): number{
    if (this.products==null)
      return 0;
    let total: number = 0;
    this.products.forEach(p => (total+=p.price*p.quantities));
    return total;
  }

  computeTotalCheckecPrice(): number{
    if (this.products==null)
      return 0;
    var total: number = 0;
    this.products.forEach(p => (p.checked? total+=p.price * p.quantities: total+=0));
    return total;
  }

  updateCurrentPrice(index: number): void{
    this.currentPrice = this.products[index].checked? this.currentPrice + this.products[index].price: this.currentPrice - this.products[index].price;
  }

}
