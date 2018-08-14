/**
 * date-picker.component
 */
import { OnInit, EventEmitter } from '@angular/core';
import { Moment } from 'moment/moment';
export declare class DatePickerComponent implements OnInit {
    dayNames: Array<string>;
    initDate: any;
    locale: string;
    viewFormat: string;
    returnObject: string;
    onDatePickerCancel: EventEmitter<boolean>;
    onSelectDate: EventEmitter<any>;
    calendarDate: Moment;
    selectedDate: Moment;
    currentMonth: any;
    today: Moment;
    currentYear: number;
    onDisplayMonths: boolean;
    onDisplayYears: boolean;
    displayYearsIndex: number;
    displayYearRange: Array<number>;
    fullYearRange: Array<any>;
    monthsShort: Array<string>;
    calendarDays: Array<Moment>;
    constructor();
    ngOnInit(): void;
    prev(): void;
    showMonthSelection(): void;
    showYearSelection(): void;
    next(): void;
    selectDay(day: Moment): void;
    selectMonth(month: string): void;
    selectYear(year: number): void;
    selectToday(): void;
    clearPickDate(): void;
    cancelDatePicker(): void;
    protected generateYears(): void;
    protected initValue(): void;
    protected generateCalendar(): void;
    protected parseToReturnObjectType(day: Moment): any;
}
