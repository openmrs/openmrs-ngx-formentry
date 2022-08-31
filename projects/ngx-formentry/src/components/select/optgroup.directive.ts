/* eslint-disable @angular-eslint/component-class-suffix, @angular-eslint/directive-class-suffix */
import { Directive, HostBinding } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: 'optgroup'
})
export class OptGroup {
  @HostBinding('class') inputClass = 'cds--select-optgroup';
}
