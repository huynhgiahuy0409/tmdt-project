import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CustomizeValidators } from 'src/app/shared/util/validators';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.email,
        CustomizeValidators.forbiddenUsername(['admin', 'password']),
      ]),
      passwordGroup: this.fb.group(
        {
          password: this.fb.control('', [Validators.required]),
          confirmPassword: this.fb.control('', [Validators.required]),
        },
        {
          validators: CustomizeValidators.matchedPassword(),
        }
      ),
    });
    console.log(this.form.get('passwordGroup'))
  }
}
