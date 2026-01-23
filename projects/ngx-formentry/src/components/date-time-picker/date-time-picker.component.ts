import {
  Component,
  Input,
  forwardRef,
  EventEmitter,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';

@Component({
    selector: 'ofe-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateTimePickerComponent),
            multi: true
        }
    ],
    standalone: false
})
export class DateTimePickerComponent implements ControlValueAccessor {
  @Input() modelValue: any;
  @Input() showDate = true;
  @Input() showTime = false;
  @Input() showWeeks = false;
  @Input() weeks: number[] = [2, 4, 6, 8, 12, 16, 24];
  @Output() dateChange = new EventEmitter<any>();
  public showDatePicker = false;
  public showTimePicker = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  weeksSelected(count) {
    const now = new Date();
    const nextDate = now.setDate(now.getDate() + count * 7);
    this.value = moment(nextDate).format();
  }
  setDate(date: any): void {
    if (date && date !== '') {
      this.value = moment(date).format();
    } else {
      this.value = date;
    }
  }

  setTime(time: any): void {
    if (time && time !== '') {
      this.value = moment(time).format();
    } else {
      this.value = time;
    }
    return;
  }

  toggleDatePicker(status: boolean): void {
    this.showDatePicker = status;
    /*setTimeout(function() {
        let _body = document.getElementById('content-wrapper').getBoundingClientRect(),
          elem = document.getElementById('section-modal-main');
        if (elem) {
          let elemBox = elem.getBoundingClientRect();
          if (elemBox.bottom > _body.bottom) {
            elem.style.bottom = '36px';
          }
        }
      }, 0);*/
    return;
  }

  toggleTimePicker(status: boolean): void {
    this.showTimePicker = status;
    return;
  }
  get value() {
    return this.modelValue;
  }

  set value(val) {
    this.modelValue = val;
    this.dateChange.emit(val);
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value instanceof Date) {
      this.value = moment(value).format();
    } else {
      this.value = value;
    }
  }
}
