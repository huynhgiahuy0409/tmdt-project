import { NgModule, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PostService{

  random: number = Math.random()
  constructor(){
  }

}
