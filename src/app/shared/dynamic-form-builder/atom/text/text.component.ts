import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'textbox',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() field: any = {};
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
