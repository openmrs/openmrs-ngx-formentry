import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ofeOption]'
})
export class OptionDirective {
  @HostBinding('class') inputClass = 'cds--select-option';
}
