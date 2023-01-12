import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
})
export class FadeInDirective implements OnInit, OnChanges {
  @Input()
  animationName!: string;
  @Input()
  animationDuration!: string;
  @Input()
  animationTimingFunction!: string;
  @Input()
  isFadeIn: boolean = true;
  constructor(private el: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFadeIn) {
      this.el.nativeElement.style.animation = `${this.animationName} ${this.animationDuration} ${this.animationTimingFunction}`;
    }else{
      this.el.nativeElement.style.animation = `unset`;
    }
  }
  ngOnInit(): void {}
}
