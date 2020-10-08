import {
  Component,
  OnInit,
  Input,
  forwardRef,
  EventEmitter,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';

const Moment = moment_;

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {
  @Input() modelValue: any;
  @Input() showDate = true;
  @Input() showTime = false;
  @Input() showWeeks = false;
  @Input() weeks: number[] = [2, 4, 6, 8, 12, 16, 24];
  @Output() onDateChange = new EventEmitter<any>();
  public showDatePicker = false;
  public showTimePicker = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit() {}

  weeksSelected(count) {
    const now = new Date();
    const nextDate = now.setDate(now.getDate() + count * 7);
    this.value = Moment(nextDate).format();
  }
  setDate(date: any): void {
    if (date && date !== '') {
      this.value = Moment(date).format();
    } else {
      this.value = date;
    }
  }

  setTime(time: any): void {
    if (time && time !== '') {
      this.value = Moment(time).format();
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
    this.onDateChange.emit(val);
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
      this.value = Moment(value).format();
    } else {
      this.value = value;
    }
  }
}
