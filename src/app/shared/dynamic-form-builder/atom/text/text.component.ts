import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: UntypedFormControl | null,
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
  @Input() form!: UntypedFormGroup;
  matcher = new MyErrorStateMatcher();
  get formArray(): UntypedFormArray {
    return this.form.get(this.field.name) as UntypedFormArray;
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
