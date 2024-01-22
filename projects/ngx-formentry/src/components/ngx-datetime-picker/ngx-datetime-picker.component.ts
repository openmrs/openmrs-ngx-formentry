import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'ofe-ngx-date-time-picker',
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
  value = '';
  isDisabled = false;
  @Input() id = '';
  @Input() theme = 'dark';
  @Input() datePickerFormat = '';
  @Input() showWeeks = false;
  @Input() weeks: number[];
  onChange = (_: any) => {};
  onTouch = () => {};
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

  onWeeksSelected(numberOfWeeks: number) {
    const currentDate: string = new Date().toString();
    this.onInput({ value: moment(currentDate).add(numberOfWeeks, 'weeks') });
  }

  getPlaceholderValue(): string {
    if (this.datePickerFormat === 'both') {
      return 'dd/mm/yyyy hh:mm';
    } else if (this.datePickerFormat === 'timer') {
      return 'hh:mm';
    } else {
      return 'dd/mm/yyyy';
    }
  }
}
