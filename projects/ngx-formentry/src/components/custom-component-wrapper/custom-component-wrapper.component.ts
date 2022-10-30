import { Component, Input } from '@angular/core';

@Component({
  selector: 'ofe-custom-component-wrapper',
  templateUrl: 'custom-component-wrapper.component.html'
})
export class CustomComponentWrapperComponent {
  @Input()
  componentConfigs: Array<{ tag: ''; url?: ''; module?: ''; detail?: any }>;

  @Input()
  dark = true;
}
