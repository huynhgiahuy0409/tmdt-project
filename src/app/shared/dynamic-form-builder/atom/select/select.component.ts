import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'dropdown',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() field: any = {};
  @Input() form!: FormGroup;
  formAttrValue!: any;
  get formAttr() {
    return this.form.get(this.field.name);
  }
  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((v) => {});
  }
}
