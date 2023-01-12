import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, delay, filter } from 'rxjs/operators';

@Directive({
  selector: '[appObserveVisibility]',
  exportAs: 'intersection',
})
export class ObserveVisibilityDirective
  implements OnDestroy, OnInit, AfterViewInit
{
  @Input() debounceTime = 0;
  @Input() threshold = 1;
  @Output() isIntersecting = new EventEmitter<boolean>();
  _isIntersecting: boolean = false
  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();
  constructor(private element: ElementRef) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.createObserver();
  }
  ngAfterViewInit(): void {
    this.startObservingElements();
  }
  private createObserver() {

    const isIntersecting = (entry: IntersectionObserverEntry) =>
      entry.isIntersecting || entry.intersectionRatio > 0;
    this.observer = new IntersectionObserver(
      (intersectionObserverEntries, observer) => {
        intersectionObserverEntries.forEach((entry) => {
          this.subject$.next({ entry, observer });
        });
      }
    );
  }
  private startObservingElements() {
    if (!this.observer) {
      return;
    }
    this.observer.observe(this.element.nativeElement);
    this.subject$
      .pipe(debounceTime(this.debounceTime))
      .subscribe((value) => {
        this._isIntersecting = value.entry.isIntersecting
        console.log(this._isIntersecting);
        
      });
  }
}
/* Note
  IntersectionObserver is interested include a element is observer in a observer
*/
