import { Observable } from 'rxjs';
import {
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { interval } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
