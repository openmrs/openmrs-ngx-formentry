
import { Component, OnInit, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
const moment = moment_;

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'ngx-date-time-picker',
    templateUrl: './ngx-date-time-picker.component.html',
    styleUrls: ['./ngx-date-time-picker.component.css'],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxDateTimePickerComponent),
            multi: true
        }
    ]
})
export class NgxDateTimePickerComponent implements OnInit, ControlValueAccessor {

    // public date = new FormControl(moment());
    public selectedTime = moment().format('HH:mm');
    public selectedDate = moment().format();
    public loadInitial = false;
    @Input() weeks: number[] = [0, 2, 4, 6, 8, 12, 16, 24];
    @Input() modelValue: any;
    @Input() showTime = false;
    @Input() showWeeks = true;
    @Output() onDateChange = new EventEmitter<any>();
    public onChange: any = () => { };
    public onTouched: any = () => { };
    public ngOnInit() {

    }

    public get value() {
        return this.modelValue;
    }

    public set value(val) {
        setTimeout(() => {
            this.onDateChange.emit(val);
        }, 100);
        this.onChange(val);
        this.onTouched();
    }

    public writeValue(value) {

                if (typeof value !== 'undefined' || value !== null) {
                    this.setFormValues(value);

                }
    }

    public setFormValues(val) {

        this.loadInitial = true;

        this.selectedDate = moment(val).format();
        this.selectedTime = moment(val).format('HH:mm');
        if (val instanceof Date) {
            this.value = moment(val).format();
        } else {
            this.value = val;
        }
        this.modelValue = this.value;

    }

    public getWeekPickerCssClass() {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    }

    public getDatePickerCssClass() {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }

        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }

        if (this.showTime === true) {
            return 'col-sm-8 form-group';
        }
        return 'col-sm-12 form-group';
    }

    public getTimePickerCssClass() {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }

        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    }

    public registerOnChange(fn) {
        this.onChange = fn;
    }

    public registerOnTouched(fn) {
        this.onTouched = fn;
    }

    public onDateSelect(event) {
        const setDate = moment(event.value);
        const setTime = this.selectedTime;
        this.setDateTime(setDate, setTime);

    }
    public onTimeSelect($event) {
        const setDate = moment(this.selectedDate);
        const setTime = $event;
        this.setDateTime(setDate, setTime);
    }

    public setCurrentTime() {
        const setDate = moment(this.selectedDate);
        const currentTime = moment().format('HH:mm');
        this.setDateTime(setDate, currentTime);
    }

    public weekSelect($event) {
        const dateToUse = moment().format();
        const nextWeekDate = moment(dateToUse).add($event, 'weeks');
        const nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    }

    public setCurrentDate() {
        const currentDay = moment();
        const currentTime = moment().format('HH:mm');
        this.setDateTime(currentDay, currentTime);


    }

    public setDateTime(setDate, setTime) {
        const newDate = moment(setDate).format('DD-MM-YYYY');
        const newTime = setTime;
        const newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm');
        const dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = newTime;
        this.modelValue = dateTimeString;
        this.value = dateTimeString;


    }
}
