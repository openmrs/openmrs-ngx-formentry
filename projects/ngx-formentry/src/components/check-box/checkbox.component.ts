import { Component, Input, forwardRef, OnInit } from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'ofe-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControlComponent),
      multi: true
    }
  ]
})
export class CheckboxControlComponent implements OnInit {
  @Input() public id: String;
  @Input() public options: Array<any>;
  @Input() public selected: Array<any>;
  public _value: Array<any> = [];

  public ngOnInit() {
    this.selected = [];
    this.options = this.options.map((option) => {
      if (this.selected.indexOf(option.value) !== -1) {
        Object.assign(option, { checked: true });
      }
      return option;
    });
  }

  public writeValue(value: any) {
    this.value = value;
  }

  public registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  get value(): any {
    if (this._value.length === 0) {
      return '';
    } else {
      return this._value || this._value[0];
    }
  }

  set value(v: any) {
    if (typeof v === 'undefined' || v === null || v === '') {
      v = [];
    } else if (typeof v === 'string') {
      v = [v];
    } else if (!Array.isArray(v)) {
      throw new TypeError('Value must be a string or an array.');
    }
  }

  public selectOpt(option, event) {
    if (event.target.checked) {
      this.selected = [...this.selected, option.value];
    } else {
      this.selected = this.selected.filter(function (o) {
        return o !== option.value;
      });
    }
    
    this._value = [...this.selected];
    this.onChange(this._value);
  }

  private onChange = (change: any) => {};
  private onTouched = () => {};
}
