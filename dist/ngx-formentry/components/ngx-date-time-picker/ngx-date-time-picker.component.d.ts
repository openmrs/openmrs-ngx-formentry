import { OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const MY_FORMATS: {
    parse: {
        dateInput: string;
    };
    display: {
        dateInput: string;
        monthYearLabel: string;
        dateA11yLabel: string;
        monthYearA11yLabel: string;
    };
};
export declare class NgxDateTimePickerComponent implements OnInit, ControlValueAccessor {
    selectedTime: string;
    selectedDate: string;
    loadInitial: boolean;
    weeks: number[];
    modelValue: any;
    showTime: boolean;
    showWeeks: boolean;
    onDateChange: EventEmitter<any>;
    onChange: any;
    onTouched: any;
    ngOnInit(): void;
    value: any;
    writeValue(value: any): void;
    setFormValues(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onDateSelect($event: any): void;
    onTimeSelect($event: any): void;
    setCurrentTime(): void;
    weekSelect($event: any): void;
    setCurrentDate(): void;
    setDateTime(setDate: any, setTime: any): void;
}
