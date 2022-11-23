import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  emailCtrl!: FormControl
  constructor( private _location: Location) {
    this.emailCtrl = new FormControl('a', Validators.email)
  }

  ngOnInit(): void {
  }

  navigateToPreviousPage(){
    this._location.back()
  }
}
