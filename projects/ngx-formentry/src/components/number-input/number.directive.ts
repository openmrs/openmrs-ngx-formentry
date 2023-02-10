import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ofeNumberScroll]'
})
export class NumberInputDirective {
  constructor(private element: ElementRef) {}

  @HostListener('wheel', ['$event'])
  public onScroll(event: WheelEvent) {
    return false;
  }
}
