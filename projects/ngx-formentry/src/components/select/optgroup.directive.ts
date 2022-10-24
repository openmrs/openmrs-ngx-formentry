import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ofeOptgroup]'
})
export class OptGroupDirective {
  @HostBinding('class') inputClass = 'cds--select-optgroup';
}
