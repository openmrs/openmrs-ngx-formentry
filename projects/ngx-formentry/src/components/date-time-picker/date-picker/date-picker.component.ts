/**
 * date-picker.component
 */

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import _ from 'lodash';
import moment, { Moment } from 'moment';

// webpack1_
declare let require: any;
// const myDpStyles: string = require('./date-picker.component.css');
// const myDpTpl: string = require('./date-picker.component.html');
// webpack2_

@Component({
    selector: 'ofe-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'],
    standalone: false
})
export class DatePickerComponent implements OnInit {
  public dayNames: Array<string>;

  @Input() public initDate: any;
  @Input() public locale = 'en';
  @Input() public viewFormat = 'll';
  @Input() public returnObject = 'js';
  @Output() public datePickerCancel = new EventEmitter<boolean>();
  @Output() public dateSelect = new EventEmitter<any>();

  public calendarDate: Moment;
  public selectedDate: Moment;
  public currentMonth: any;
  public today: Moment;
  public currentYear: number;
  public onDisplayMonths = false;
  public onDisplayYears = false;
  public displayYearsIndex = 0;
  public displayYearRange: Array<number>;
  public fullYearRange: Array<any>;
  public monthsShort: Array<string> = moment.monthsShort();
  public calendarDays: Array<Moment>;

  constructor() {}

  public ngOnInit(): void {
    this.initValue();
    // default to current year range
    _.each(this.fullYearRange, (v, i) => {
      this.currentYear = this.calendarDate.clone().startOf('year').year();
      if (v.indexOf(this.currentYear) !== -1) {
        this.displayYearsIndex = i;
      }
    });
    this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
    this.generateCalendar();
  }

  public prev(): void {
    if (this.onDisplayYears) {
      this.displayYearsIndex--;
      if (this.displayYearsIndex < 0) {
        this.displayYearsIndex = 0;
      }
      this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
    } else {
      this.calendarDate = this.calendarDate.clone().subtract(1, 'M');
    }
    this.generateCalendar();
  }

  public showMonthSelection(): void {
    this.onDisplayMonths = true;
    this.onDisplayYears = false;
  }

  public showYearSelection(): void {
    this.onDisplayYears = true;
    this.onDisplayMonths = false;
  }

  public next(): void {
    if (this.onDisplayYears) {
      this.displayYearsIndex++;
      if (this.displayYearsIndex >= this.fullYearRange.length) {
        this.displayYearsIndex = this.fullYearRange.length - 1;
      }
      this.displayYearRange = this.fullYearRange[this.displayYearsIndex++];
    } else {
      this.calendarDate = this.calendarDate.clone().add(1, 'M');
    }
    this.generateCalendar();
  }

  public selectDay(day: Moment): void {
    const daysDifference = day.diff(
      this.calendarDate.clone().startOf('date'),
      'days'
    );
    day = this.calendarDate.clone().add(daysDifference, 'd');
    const selectedDay = this.parseToReturnObjectType(day);
    this.dateSelect.emit(selectedDay);
    this.cancelDatePicker();
    return;
  }

  public selectMonth(month: string) {
    this.calendarDate = this.calendarDate.clone().month(month);
    this.onDisplayMonths = false;
    this.generateCalendar();
  }

  public selectYear(year: number) {
    this.calendarDate = this.calendarDate.clone().year(year);
    this.onDisplayYears = false;
    this.generateCalendar();
  }

  public selectToday(): void {
    const today = this.parseToReturnObjectType(moment());
    this.dateSelect.emit(today);
    this.cancelDatePicker();
    return;
  }

  public clearPickDate(): void {
    this.dateSelect.emit(null);
    this.cancelDatePicker();
    return;
  }

  public cancelDatePicker(): void {
    this.datePickerCancel.emit(false);
    return;
  }

  protected generateYears(): void {
    const currentYear = moment().year();
    const startYr = this.calendarDate.clone().subtract(100, 'y').year();
    // const endYr = this.calendarDate.clone().add(10, 'y').year();
    const years = [];
    for (let year = startYr; year <= currentYear; year++) {
      years.push(year);
    }

    this.fullYearRange = _.chunk(years, 14);
  }

  protected initValue() {
    // set moment locale (default is en)
    moment.locale(this.locale);
    // set today value
    this.today = moment().startOf('date');
    this.currentMonth = this.monthsShort[moment().month()];
    this.currentYear = moment().year();

    // set week days name array
    this.dayNames = moment.weekdaysShort(true);

    // check if the input initDate has value
    if (this.initDate) {
      this.calendarDate =
        this.returnObject === 'string'
          ? moment(this.initDate, this.viewFormat)
          : moment(this.initDate);
      this.selectedDate = this.calendarDate.clone().startOf('date');
    } else {
      this.calendarDate = moment();
    }
    this.generateYears();
  }

  protected generateCalendar(): void {
    this.calendarDays = [];
    const start =
      0 -
      ((this.calendarDate.clone().startOf('month').day() +
        (7 - moment.localeData().firstDayOfWeek())) %
        7);
    const end = 41 + start; // iterator ending point

    for (let i = start; i <= end; i += 1) {
      const day = this.calendarDate.clone().startOf('month').add(i, 'days');
      this.calendarDays.push(day);
    }
  }

  protected parseToReturnObjectType(day: Moment): any {
    switch (this.returnObject) {
      case 'js':
        return day.toDate();

      case 'string':
        return day.format(this.viewFormat);

      case 'moment':
        return day;

      case 'json':
        return day.toJSON();

      case 'array':
        return day.toArray();

      case 'iso':
        return day.toISOString();

      case 'object':
        return day.toObject();

      default:
        return day;
    }
  }
}
