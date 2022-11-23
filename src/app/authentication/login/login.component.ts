import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isPasswordHidden: boolean = true
  signInFG!: FormGroup
  constructor(private _fb: FormBuilder) {
    this.signInFG = this._fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    )

  }
  
  ngOnInit(): void {
  }
}
