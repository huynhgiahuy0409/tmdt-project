import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'textbox',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() field: any = {};
  @Input() form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  get formArray(): FormArray {
    return this.form.get(this.field.name) as FormArray;
  }
  constructor() {}

  ngOnInit(): void {
    console.log(
      this.field.name +
        ' ' +
        this.form.get(this.field.name)!.hasError('required')
    );
  }
}
