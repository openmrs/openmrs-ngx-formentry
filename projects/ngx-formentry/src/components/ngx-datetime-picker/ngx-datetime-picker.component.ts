import { Component, forwardRef , Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'ngx-datetimepicker',
  templateUrl: './ngx-datetime-picker.html',
  styleUrls: ['./ngx-datetime-picker.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxDatetimeComponent),
      multi: true
    }
  ]
})
export class NgxDatetimeComponent implements ControlValueAccessor {
  value: String | Date = '';
  isDisabled: Boolean = false;
  @Input() id = ''
;
  onChange = (_: any) => { };
  onTouch = () => { };
  onInput($event: any) {
    this.onTouch();
    this.onChange(moment($event.value).format());
  }

  writeValue(value: any): void {
    if (value && value !== '') {
      this.value = moment(value).format();
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
