import { Component, OnInit, Input, forwardRef } from '@angular/core';
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
export class NgxDatetimeComponent implements OnInit, ControlValueAccessor {
  value: String | Date = '';
  isDisabled: boolean;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor() { }

  ngOnInit() {
  }

  onInput($event: any) {
    this.onTouch();
    this.onChange($event.value);
  }

  writeValue(value: any): void {
    if (value && value !== '' && value instanceof Date) {
      this.value = value;
    } else if (typeof value === 'string') {
      this.value = moment(value).toDate();
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