import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
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
  of,
  pipe,
  Subject,
  throwError,
  timer,
} from 'rxjs';
import {
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
  searchTerm: string = '123';
  title = 'Toy Store';
  rfContact!: FormGroup;
  demo: validator1 = {
    huy: 'huynhgia',
    1: 'huynhgiahuy',
  };
  fullName: validator = (firstName: string) => {
    return firstName;
  };
  myControl = new FormControl();
  options: string[] = [this.demo['huy'], this.demo['huy']];
  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    let i = interval(1000).pipe(take(4));
    let map$ = i.pipe(
      mergeMap(x => of(1,2,3))
    );
    map$.subscribe(val => console.log(val))

    this.rfContact = new FormGroup({
      contactName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(),
      social: new FormGroup({
        facebook: this.fb.control(''),
        twitters: new FormControl(),
        website: new FormControl(),
      }),
      tels: this.fb.array([this.fb.control(''), this.fb.control('')]),
    });
  }
  get tels(): FormArray {
    return this.rfContact.controls.tels as FormArray;
  }
  addTel() {
    this.tels.push(this.fb.control(''));
  }
  addTel1() {}
  removeTel(index: number) {
    this.tels.removeAt(index);
  }
  onSubmit() {
    console.log(this.tels);
  }
  inputChange(event: any) {
    console.log(event);
  }
}
