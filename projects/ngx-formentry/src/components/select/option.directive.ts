/* eslint-disable @angular-eslint/component-class-suffix, @angular-eslint/directive-class-suffix */
import { Directive, HostBinding } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: 'option'
})
export class Option {
  @HostBinding('class') inputClass = 'bx--select-option';
}
