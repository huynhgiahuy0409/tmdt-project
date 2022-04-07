import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() field: any = {};
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
