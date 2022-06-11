import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'dropdown',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() field: any = {};
  @Input() form!: UntypedFormGroup;
  formAttrValue!: any;
  get formAttr() {
    return this.form.get(this.field.name);
  }
  constructor() {}

  ngOnInit(): void {
    if (!this.field.name) {
      console.log(localStorage['categories'][0]);
    }
  }
}
