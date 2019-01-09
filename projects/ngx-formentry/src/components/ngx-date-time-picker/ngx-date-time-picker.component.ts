import { Moment } from 'moment/moment';

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
    public selectedTime = moment().format();
    public selectedDate = moment().format();
    public loadInitial = false;
    public value;
    public showTimePicker = false;
    @Input() weeks: number[] = [0, 2, 4, 6, 8, 12, 16, 24];
    @Input() modelValue: any;
    @Input() showTime = false;
    @Input() showWeeks = true;
    @Output() onDateChange = new EventEmitter<any>();
    public onChange: any = () => { };
    public onTouched: any = () => { };
    public ngOnInit() {

    }


    public writeValue(value) {
        this.value = value;
    }

    public registerOnChange(fn) {
        this.onChange = fn;
    }

    public registerOnTouched(fn) {

    }

    public onTimeSelect($event) {
        const setDate = moment(this.selectedDate);
        const setTime = $event;
        this.setDateTime(setDate, setTime);
    }

    public onDateSelect($event) {

        const setDate = moment($event.value);
        const setTime = this.selectedTime;
        const dateString = this.setDateTime(setDate, setTime);

        const selectedDate = $event.value;
        this.value = dateString;

    }

    public toggleTimePicker(status: boolean): void {
        this.showTimePicker = status;
        return;
    }


    public setCurrentTime() {

        const setDate = moment(this.selectedDate);
        const currentTime = moment().format('HH:mm:ss');
        this.setDateTime(setDate, currentTime);
    }

    public weekSelect($event) {
        let dateToUse;
        if (this.value === '' || typeof this.value === 'undefined') {
            dateToUse = moment().format();
        } else {
            dateToUse = moment(this.value).format();
        }
        const nextWeekDate = moment(dateToUse).add($event.value, 'weeks');
        const nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    }

    public selectionChange($event) {
        console.log('Week selected', $event);
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

    public setDateTime(setDate, setTime) {
        const newDate = moment(setDate).format('DD-MM-YYYY');
        let newTime;
        if (this.showTime) {
            newTime = moment(setTime).format('HH:mm:ss');
        } else {
            newTime = '00:00:00';
        }
        const newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
        const dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = dateTimeString;
        this.value = dateTimeString;
        this.onChange(this.value);

        return dateTimeString;


    }
}
