import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'textbox',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() field: any = {};
  @Input() form!: FormGroup;
  get formArray(): FormArray {
    return this.form.get(this.field.name) as FormArray;
  }
  constructor() {}

  ngOnInit(): void {}
}
