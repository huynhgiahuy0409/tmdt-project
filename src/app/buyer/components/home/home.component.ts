import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: number[][] = []
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    console.log(this.postService.random)
    let arrayElement: number[] = []
    for (let index = 1; index <= 20; index++) {
      let length = arrayElement.push(index)
      if((index % 4) === 0 && index >= 4){
        length = this.products.push(arrayElement)
        arrayElement = []
      }
    }
  }

}
