import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[ofeOptgroup]',
    standalone: false
})
export class OptGroupDirective {
  @HostBinding('class') inputClass = 'cds--select-optgroup';
}
