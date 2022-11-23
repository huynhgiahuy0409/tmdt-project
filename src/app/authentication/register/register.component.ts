import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
