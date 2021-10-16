import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  public products!: any[];
  public logos!: any[];
  public departments!: String[];
  public prices!: any[];
  public discounts!: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.products = [0, 1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13];
    this.logos = [0, 1, 2, 3, 4, 5, 6, 7];
    this.departments = ['Amazon Devices', 'Arts', 'Crafts & Sewing',
      'Automotive & Motorcycle', ' Baby', 'Baby Clothing & Accessories',
      'Beauty', 'Books', 'Boys’ Fashion', 'Camera & Photo', 'Cell Phones & Accessories',
      ' Computers & Accessories', 'Costumes & Accessories', 'Electronics', 'Everything Else',
      'Fashion', ' Furniture', 'Girls’ Fashion', 'Grocery', 'Headphones', 'Health & Personal Care',
      'Home', 'Home Audio', 'Home Improvement', 'Industrial & Scientific', 'Kindle', 'Kindle eBooks',
      'Kitchen', 'Luggage Travel Gear', 'Magazines', 'Major Appliances', 'Men’s Clothing',
      'Men’s Fashion', 'Movies & TV', 'Music', 'Musical Instruments', 'Office Electronics & Supplies',
      'Patio, Lawn & Garden', 'Pet Supplies', 'Power & Hand Tools', 'Software', 'Sports & Outdoors',
      'Television & Video', 'Toys & Games', 'Video Games', 'Women’s Clothing', 'Women’s Fashion',
      'Women’s Jewelry'];
    this.prices = ['All','Under $25','$25 to $50','$50 to $100','$100 to $200','$200 & Above'];
    this.discounts = ['All deals','10% off or more','25% off or more','50% off or more','70% off or more']
  }

}
