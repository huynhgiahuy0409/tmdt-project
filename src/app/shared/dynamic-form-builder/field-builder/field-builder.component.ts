import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss'],
})
export class FieldBuilderComponent implements OnInit {
  @Input() field: any;
  @Input() form!: any;
  get formAttr() {
    return this.form.get(this.field.name);
  }
  constructor() {}
  ngOnInit(): void {}
}
