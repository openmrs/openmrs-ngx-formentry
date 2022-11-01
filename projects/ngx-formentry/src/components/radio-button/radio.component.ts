import { Component, Input, forwardRef, OnInit } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'ofe-radio-button',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonControlComponent),
      multi: true
    }
  ]
})
export class RadioButtonControlComponent implements ControlValueAccessor, OnInit {
  @Input() public id: String;
  @Input() public options: Array<any>;
  @Input() public allowUnselect: boolean;

  public ngOnInit() {
    this.options = this.options.map((opt) => ({ ...opt, checked: false }));
  }

  public writeValue(value: any) {}

  public registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  public handleClick(option) {
    if (this.allowUnselect && option.checked) {
      option.checked = false;
    } else if (!option.checked) {
      option.checked = true;
    }
  }

  public onChange = (_: any) => {};
  public onTouched = () => {};
}
