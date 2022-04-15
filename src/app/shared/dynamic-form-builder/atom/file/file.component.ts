import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() field: any = {};
  @Input() form!: FormGroup;
  constructor() {}
  get formAttr(): AbstractControl {
    return this.form.get(this.field.name) as AbstractControl;
  }
  get formArray(): FormArray {
    return this.form.get(this.field.name) as FormArray;
  }
  ngOnInit(): void {
    console.log(this.formAttr);
  }
}
