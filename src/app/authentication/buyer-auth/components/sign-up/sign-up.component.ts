import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isPasswordHidden: boolean = true
  signupFG!: FormGroup
  constructor(private _fb: FormBuilder) {
    this.signupFG = _fb.group(
      {
        username: ["", [Validators.email, Validators.required]],
        fullName: ["", [Validators.required]],
        password: ["", [Validators.email, Validators.required]],
        confirmPassword: ["", [Validators.email, Validators.required]],
      }
    )
  }

  ngOnInit(): void {
  }

}
