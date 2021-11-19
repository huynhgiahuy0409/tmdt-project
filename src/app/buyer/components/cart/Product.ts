export class Product{
  image: string = "assets/img/s-product/product.jpg";
  quantities: number = 1;
  checked: boolean = false;
  name: string;
  price: number = 200000;
  constructor(name:string) {
    this.name = name;
  }
}
