import { Component, Input, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
import * as _ from 'lodash';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxControlComponent),
        multi: true,
    }],
  styles: [`
  .no-border {
    border: 0;
    box-shadow: none;
  }`]
})
export class CheckboxControlComponent {

  @Input() public options;

  public _value: Array<any> = [];

  public ngOnInit() {}

  public ngAfterViewInit() {}

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
      this._value.push(option.value);
    } else {
      this.options.forEach((o) => {
        if (o.value === option.value) {
          this._value.splice(o, 1);
        }
      });
    }

    this.onChange(this.value);
  }

  private onChange = (_: any) => { };
  private onTouched = () => { };

}
