/**
 * date-picker.component
 */

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment/moment';
import * as _ from 'lodash';
import { Moment } from 'moment/moment';

// webpack1_
declare let require: any;
// const myDpStyles: string = require('./date-picker.component.css');
// const myDpTpl: string = require('./date-picker.component.html');
// webpack2_

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})

export class DatePickerComponent implements OnInit {

  public dayNames: Array<string>;

  @Input() public initDate: any;
  @Input() public locale: string = 'en';
  @Input() public viewFormat: string = 'll';
  @Input() public returnObject: string = 'js';
  @Output() public onDatePickerCancel = new EventEmitter<boolean>();
  @Output() public onSelectDate = new EventEmitter<any>();

  public calendarDate: Moment;
  public selectedDate: Moment;
  public today: Moment;
  public currentMonth: string;
  public currentYear: number;
  public onDisplayMonths: boolean = false;
  public onDisplayYears: boolean = false;
  public displayYearsIndex: number = 0;
  public displayYearRange: Array<number>;
  public fullYearRange: Array<any>;
  public monthsShort: Array<string> = moment.monthsShort();
  public calendarDays: Array<Moment>;

  constructor() {
  }

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
    let daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
    day = this.calendarDate.clone().add(daysDifference, 'd');
    let selectedDay = this.parseToReturnObjectType(day);
    this.onSelectDate.emit(selectedDay);
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
    let today = this.parseToReturnObjectType(moment());
    this.onSelectDate.emit(today);
    this.cancelDatePicker();
    return;
  }

  public clearPickDate(): void {
    this.onSelectDate.emit(null);
    this.cancelDatePicker();
    return;
  }

  public cancelDatePicker(): void {
    this.onDatePickerCancel.emit(false);
    return;
  }

  protected generateYears(): void {
    const currentYear = moment().year();
    const startYr = this.calendarDate.clone().subtract(100, 'y').year();
    // const endYr = this.calendarDate.clone().add(10, 'y').year();
    let years = [];
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
      this.calendarDate = this.returnObject === 'string' ? moment(this.initDate, this.viewFormat) :
        moment(this.initDate);
      this.selectedDate = this.calendarDate.clone().startOf('date');
    } else {
      this.calendarDate = moment();
    }
    this.generateYears();
  }

  protected generateCalendar(): void {
    this.calendarDays = [];
    let start = 0 - (this.calendarDate.clone().startOf('month').day() +
     (7 - moment.localeData().firstDayOfWeek())) % 7;
    let end = 41 + start; // iterator ending point

    for (let i = start; i <= end; i += 1) {
      let day = this.calendarDate.clone().startOf('month').add(i, 'days');
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
