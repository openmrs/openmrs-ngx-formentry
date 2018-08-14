import { OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class DateTimePickerComponent implements OnInit, ControlValueAccessor {
    modelValue: any;
    showDate: boolean;
    showTime: boolean;
    showWeeks: boolean;
    weeks: number[];
    onDateChange: EventEmitter<any>;
    showDatePicker: boolean;
    showTimePicker: boolean;
    onChange: any;
    onTouched: any;
    constructor();
    ngOnInit(): void;
    weeksSelected(count: any): void;
    setDate(date: any): void;
    setTime(time: any): void;
    toggleDatePicker(status: boolean): void;
    toggleTimePicker(status: boolean): void;
    value: any;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    writeValue(value: any): void;
}
