import { Component, OnInit, Input, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Moment from 'moment';
import { Output } from '@angular/core/src/metadata/directives';

const myDpTpl: string = require('./date-time-picker.component.html');
const myDpStyles: string = require('./date-time-picker.component.css');
@Component({
    selector: 'date-time-picker',
    template: myDpTpl,
    styles: [myDpStyles],
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
    @Input() showDate: boolean = true;
    @Input() showTime: boolean = false;
    @Input() showWeeks: boolean = false;
    @Input() weeks: number[] = [2, 4, 6, 8, 12, 16, 24];
    @Output() onDateChange = new EventEmitter<any>();
    private showDatePicker: boolean = false;
    private showTimePicker: boolean = false;
    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {
    }

    ngOnInit() { }

    weeksSelected(count) {
        let now = new Date();
        let nextDate = now.setDate(now.getDate() + count * 7);
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
      setTimeout(function() {
        let _body = document.getElementById('section-box-body').getBoundingClientRect(),
          elem = document.getElementById('section-modal-main');
        if (elem) {
          let elemBox = elem.getBoundingClientRect();
          if (elemBox.bottom > _body.bottom) {
            elem.style.bottom = '36px';
          }
        }
      }, 0);
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
