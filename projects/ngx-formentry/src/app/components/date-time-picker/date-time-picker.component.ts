import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Moment from 'moment';

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
    @Input() weeks: number[] = [1, 2, 4, 6, 8, 12, 16, 24];
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
        this.value = Moment(date).format();
        return;
    }

    setTime(time: any): void {
        this.value = Moment(time).format();
        return;
    }

    toggleDatePicker(status: boolean): void {
        this.showDatePicker = status;
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
        if (value) {
            this.value = value;
        }
    }
}
