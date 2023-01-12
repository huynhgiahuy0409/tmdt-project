import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  fromEvent,
  interval,
  Observable,
  of,
  pipe,
  Subject,
  throwError,
  timer,
} from 'rxjs';
import {
  buffer,
  catchError,
  debounce,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  retry,
  scan,
  skip,
  skipWhile,
  switchMap,
  take,
  takeWhile,
  throttleTime,
} from 'rxjs/operators';
import { PostService } from './buyer/post.service';
export interface validator {
  (control: string): string;
}
export interface validator1 {
  [control: string]: string;
  [control1: number]: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Toy Store';
  constructor(private activeRoute: ActivatedRoute, private fb: UntypedFormBuilder, private ps: PostService) {
    const os1$ = fromEvent<MouseEvent>(document, 'mousemove')
    os1$.pipe(
      map(
        (v: MouseEvent) => v.clientX
      ),
      throttleTime(5000)
    ).subscribe(
      v => {
        console.log(v);
      }
    )
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
  }
}
  