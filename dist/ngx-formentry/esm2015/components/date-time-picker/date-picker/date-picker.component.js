/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * date-picker.component
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment_ from 'moment';
const /** @type {?} */ moment = moment_;
import * as _ from 'lodash';
export class DatePickerComponent {
    constructor() {
        this.locale = 'en';
        this.viewFormat = 'll';
        this.returnObject = 'js';
        this.onDatePickerCancel = new EventEmitter();
        this.onSelectDate = new EventEmitter();
        this.onDisplayMonths = false;
        this.onDisplayYears = false;
        this.displayYearsIndex = 0;
        this.monthsShort = moment.monthsShort();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    /**
     * @return {?}
     */
    prev() {
        if (this.onDisplayYears) {
            this.displayYearsIndex--;
            if (this.displayYearsIndex < 0) {
                this.displayYearsIndex = 0;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        }
        else {
            this.calendarDate = this.calendarDate.clone().subtract(1, 'M');
        }
        this.generateCalendar();
    }
    /**
     * @return {?}
     */
    showMonthSelection() {
        this.onDisplayMonths = true;
        this.onDisplayYears = false;
    }
    /**
     * @return {?}
     */
    showYearSelection() {
        this.onDisplayYears = true;
        this.onDisplayMonths = false;
    }
    /**
     * @return {?}
     */
    next() {
        if (this.onDisplayYears) {
            this.displayYearsIndex++;
            if (this.displayYearsIndex >= this.fullYearRange.length) {
                this.displayYearsIndex = this.fullYearRange.length - 1;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex++];
        }
        else {
            this.calendarDate = this.calendarDate.clone().add(1, 'M');
        }
        this.generateCalendar();
    }
    /**
     * @param {?} day
     * @return {?}
     */
    selectDay(day) {
        const /** @type {?} */ daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
        day = this.calendarDate.clone().add(daysDifference, 'd');
        const /** @type {?} */ selectedDay = this.parseToReturnObjectType(day);
        this.onSelectDate.emit(selectedDay);
        this.cancelDatePicker();
        return;
    }
    /**
     * @param {?} month
     * @return {?}
     */
    selectMonth(month) {
        this.calendarDate = this.calendarDate.clone().month(month);
        this.onDisplayMonths = false;
        this.generateCalendar();
    }
    /**
     * @param {?} year
     * @return {?}
     */
    selectYear(year) {
        this.calendarDate = this.calendarDate.clone().year(year);
        this.onDisplayYears = false;
        this.generateCalendar();
    }
    /**
     * @return {?}
     */
    selectToday() {
        const /** @type {?} */ today = this.parseToReturnObjectType(moment());
        this.onSelectDate.emit(today);
        this.cancelDatePicker();
        return;
    }
    /**
     * @return {?}
     */
    clearPickDate() {
        this.onSelectDate.emit(null);
        this.cancelDatePicker();
        return;
    }
    /**
     * @return {?}
     */
    cancelDatePicker() {
        this.onDatePickerCancel.emit(false);
        return;
    }
    /**
     * @return {?}
     */
    generateYears() {
        const /** @type {?} */ currentYear = moment().year();
        const /** @type {?} */ startYr = this.calendarDate.clone().subtract(100, 'y').year();
        // const endYr = this.calendarDate.clone().add(10, 'y').year();
        const /** @type {?} */ years = [];
        for (let /** @type {?} */ year = startYr; year <= currentYear; year++) {
            years.push(year);
        }
        this.fullYearRange = _.chunk(years, 14);
    }
    /**
     * @return {?}
     */
    initValue() {
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
        }
        else {
            this.calendarDate = moment();
        }
        this.generateYears();
    }
    /**
     * @return {?}
     */
    generateCalendar() {
        this.calendarDays = [];
        const /** @type {?} */ start = 0 - (this.calendarDate.clone().startOf('month').day() +
            (7 - moment.localeData().firstDayOfWeek())) % 7;
        const /** @type {?} */ end = 41 + start; // iterator ending point
        for (let /** @type {?} */ i = start; i <= end; i += 1) {
            const /** @type {?} */ day = this.calendarDate.clone().startOf('month').add(i, 'days');
            this.calendarDays.push(day);
        }
    }
    /**
     * @param {?} day
     * @return {?}
     */
    parseToReturnObjectType(day) {
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
DatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-picker',
                template: `<picker-modal (onOverlayClick)="cancelDatePicker()">
  <div class="picker-wrap">
    <div class="picker-box">
      <div class="picker-header">
        <div class="picker-header-nav">
          <span class="nav-prev" (click)="prev()"></span>
        </div>
        <div class="picker-header-content">
          <div class="content">
            <span (click)="showMonthSelection()" class="month">{{calendarDate | moment: "MMMM"}}</span>
            <span class="seperator">|</span>
            <span (click)="showYearSelection()" class="year">{{calendarDate | moment: "YYYY"}}</span>
          </div>
        </div>
        <div class="picker-header-nav">
          <span class="nav-next" (click)="next()"></span>
        </div>
      </div>
      <div class="picker-calendar">
        <div class="picker-calendar-row" *ngIf="!onDisplayMonths && !onDisplayYears">
          <span class="picker-weekday" *ngFor="let day of dayNames">{{ day }}</span>
        </div>
        <div class="picker-calendar-row" *ngIf="!onDisplayMonths && !onDisplayYears">
                    <span class="picker-day" (click)="selectDay(day)" [ngClass]="{
                       'out-focus': day.month() != calendarDate.month(),
                       'today': day.isSame(today),
                       'selected': day.isSame(selectedDate)
                      }" *ngFor="let day of calendarDays">
                    {{ day | moment: 'D'}}
                </span>
        </div>
        <div class="picker-calendar-row" *ngIf="onDisplayMonths">
                    <span class="picker-month" *ngFor="let month of monthsShort"
                          (click)="selectMonth(month)"
                          [ngClass]="{
                       'selected': month === currentMonth
                      }">
                    {{ month }}
                </span>
        </div>
        <div class="picker-calendar-row" *ngIf="onDisplayYears">
                    <span class="picker-year" *ngFor="let year of displayYearRange"
                          (click)="selectYear(year)"
                          [ngClass]="{
                       'selected': year === currentYear
                      }">
                    {{ year }}
                </span>
        </div>
      </div>
      <div class="picker-footer">
        <div class="picker-action action-today" (click)="selectToday()"><span class="text">Today</span></div>
        <div class="picker-action action-clear" (click)="clearPickDate()"><span class="text">Clear</span></div>
        <div class="picker-action action-close" (click)="cancelDatePicker()"><span class="text">Close</span></div>
      </div>
    </div>
  </div>
</picker-modal>
`,
                styles: [`*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px!important;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.picker-header-nav .nav-next::before,.picker-header-nav .nav-prev::before{content:" ";border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:flex;flex-wrap:wrap;width:100%;margin-bottom:.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:" ";position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-today::before{content:" ";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}`],
            },] },
];
/** @nocollapse */
DatePickerComponent.ctorParameters = () => [];
DatePickerComponent.propDecorators = {
    "initDate": [{ type: Input },],
    "locale": [{ type: Input },],
    "viewFormat": [{ type: Input },],
    "returnObject": [{ type: Input },],
    "onDatePickerCancel": [{ type: Output },],
    "onSelectDate": [{ type: Output },],
};
function DatePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DatePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DatePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DatePickerComponent.propDecorators;
    /** @type {?} */
    DatePickerComponent.prototype.dayNames;
    /** @type {?} */
    DatePickerComponent.prototype.initDate;
    /** @type {?} */
    DatePickerComponent.prototype.locale;
    /** @type {?} */
    DatePickerComponent.prototype.viewFormat;
    /** @type {?} */
    DatePickerComponent.prototype.returnObject;
    /** @type {?} */
    DatePickerComponent.prototype.onDatePickerCancel;
    /** @type {?} */
    DatePickerComponent.prototype.onSelectDate;
    /** @type {?} */
    DatePickerComponent.prototype.calendarDate;
    /** @type {?} */
    DatePickerComponent.prototype.selectedDate;
    /** @type {?} */
    DatePickerComponent.prototype.currentMonth;
    /** @type {?} */
    DatePickerComponent.prototype.today;
    /** @type {?} */
    DatePickerComponent.prototype.currentYear;
    /** @type {?} */
    DatePickerComponent.prototype.onDisplayMonths;
    /** @type {?} */
    DatePickerComponent.prototype.onDisplayYears;
    /** @type {?} */
    DatePickerComponent.prototype.displayYearsIndex;
    /** @type {?} */
    DatePickerComponent.prototype.displayYearRange;
    /** @type {?} */
    DatePickerComponent.prototype.fullYearRange;
    /** @type {?} */
    DatePickerComponent.prototype.monthsShort;
    /** @type {?} */
    DatePickerComponent.prototype.calendarDays;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyx1QkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBeUU1QixNQUFNO0lBd0JKO3NCQW5CeUIsSUFBSTswQkFDQSxJQUFJOzRCQUNGLElBQUk7a0NBQ0csSUFBSSxZQUFZLEVBQVc7NEJBQ2pDLElBQUksWUFBWSxFQUFPOytCQU85QixLQUFLOzhCQUNOLEtBQUs7aUNBQ0YsQ0FBQzsyQkFHUSxNQUFNLENBQUMsV0FBVyxFQUFFO0tBSXZEOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7UUFFakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1NBQ0YsQ0FB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QUFRO2dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFeEI7Z0JBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNkO0tBQ0Y7OztZQTVQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBEWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxzMUZBQXMxRixDQUFDO2FBQ2oyRjs7Ozs7eUJBTUUsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzttQ0FDTCxNQUFNOzZCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtcGlja2VyLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG4vLyB3ZWJwYWNrMV9cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50LmNzcycpO1xuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcpO1xuLy8gd2VicGFjazJfXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGUtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8cGlja2VyLW1vZGFsIChvbk92ZXJsYXlDbGljayk9XCJjYW5jZWxEYXRlUGlja2VyKClcIj5cbiAgPGRpdiBjbGFzcz1cInBpY2tlci13cmFwXCI+XG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1ib3hcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaGVhZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaGVhZGVyLW5hdlwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2LXByZXZcIiAoY2xpY2spPVwicHJldigpXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1oZWFkZXItY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwic2hvd01vbnRoU2VsZWN0aW9uKClcIiBjbGFzcz1cIm1vbnRoXCI+e3tjYWxlbmRhckRhdGUgfCBtb21lbnQ6IFwiTU1NTVwifX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlcGVyYXRvclwiPnw8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwic2hvd1llYXJTZWxlY3Rpb24oKVwiIGNsYXNzPVwieWVhclwiPnt7Y2FsZW5kYXJEYXRlIHwgbW9tZW50OiBcIllZWVlcIn19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1oZWFkZXItbmF2XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXYtbmV4dFwiIChjbGljayk9XCJuZXh0KClcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNhbGVuZGFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY2FsZW5kYXItcm93XCIgKm5nSWY9XCIhb25EaXNwbGF5TW9udGhzICYmICFvbkRpc3BsYXlZZWFyc1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGlja2VyLXdlZWtkYXlcIiAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheU5hbWVzXCI+e3sgZGF5IH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jYWxlbmRhci1yb3dcIiAqbmdJZj1cIiFvbkRpc3BsYXlNb250aHMgJiYgIW9uRGlzcGxheVllYXJzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGlja2VyLWRheVwiIChjbGljayk9XCJzZWxlY3REYXkoZGF5KVwiIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgJ291dC1mb2N1cyc6IGRheS5tb250aCgpICE9IGNhbGVuZGFyRGF0ZS5tb250aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAndG9kYXknOiBkYXkuaXNTYW1lKHRvZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdGVkJzogZGF5LmlzU2FtZShzZWxlY3RlZERhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgfVwiICpuZ0Zvcj1cImxldCBkYXkgb2YgY2FsZW5kYXJEYXlzXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGRheSB8IG1vbWVudDogJ0QnfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNhbGVuZGFyLXJvd1wiICpuZ0lmPVwib25EaXNwbGF5TW9udGhzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGlja2VyLW1vbnRoXCIgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoc1Nob3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1vbnRoKG1vbnRoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdGVkJzogbW9udGggPT09IGN1cnJlbnRNb250aFxuICAgICAgICAgICAgICAgICAgICAgIH1cIj5cbiAgICAgICAgICAgICAgICAgICAge3sgbW9udGggfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNhbGVuZGFyLXJvd1wiICpuZ0lmPVwib25EaXNwbGF5WWVhcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWNrZXIteWVhclwiICpuZ0Zvcj1cImxldCB5ZWFyIG9mIGRpc3BsYXlZZWFyUmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0WWVhcih5ZWFyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdGVkJzogeWVhciA9PT0gY3VycmVudFllYXJcbiAgICAgICAgICAgICAgICAgICAgICB9XCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IHllYXIgfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWZvb3RlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tdG9kYXlcIiAoY2xpY2spPVwic2VsZWN0VG9kYXkoKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPlRvZGF5PC9zcGFuPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tY2xlYXJcIiAoY2xpY2spPVwiY2xlYXJQaWNrRGF0ZSgpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Q2xlYXI8L3NwYW4+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jbG9zZVwiIChjbGljayk9XCJjYW5jZWxEYXRlUGlja2VyKClcIj48c3BhbiBjbGFzcz1cInRleHRcIj5DbG9zZTwvc3Bhbj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvcGlja2VyLW1vZGFsPlxuYCxcbiAgc3R5bGVzOiBbYCosOjphZnRlciw6OmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnBpY2tlci13cmFwe3dpZHRoOjk1dnc7bWF4LXdpZHRoOjY2NnB4fS5waWNrZXItYm94e2ZvbnQtZmFtaWx5OidPcGVuIFNhbnMnO21pbi13aWR0aDo0MDBweCFpbXBvcnRhbnQ7cGFkZGluZzouNjI1cmVtIDFyZW07LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5waWNrZXItZm9vdGVyLC5waWNrZXItaGVhZGVye2ZvbnQtc2l6ZToxLjMzM3JlbTtsaW5lLWhlaWdodDoyLjVyZW07ZGlzcGxheTpmbGV4O2hlaWdodDoyLjVyZW07d2lkdGg6MTAwJX0ucGlja2VyLWhlYWRlci1uYXZ7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6Y2FsYygxMDAlIC8gOCl9LnBpY2tlci1oZWFkZXItbmF2Pip7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtyaWdodDphdXRvO2JvdHRvbTphdXRvO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKX0ucGlja2VyLWhlYWRlci1uYXYgLm5hdi1uZXh0OjpiZWZvcmUsLnBpY2tlci1oZWFkZXItbmF2IC5uYXYtcHJldjo6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7Ym9yZGVyLXRvcDouNWVtIHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1ib3R0b206LjVlbSBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6Ljc1ZW0gc29saWQgIzAwMDt3aWR0aDowO2hlaWdodDowO2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjAgYXV0b30ucGlja2VyLWhlYWRlci1uYXYgLm5hdi1uZXh0OjpiZWZvcmV7Ym9yZGVyLXJpZ2h0OjA7Ym9yZGVyLWxlZnQ6Ljc1ZW0gc29saWQgIzAwMH0ucGlja2VyLWhlYWRlci1jb250ZW50e3dpZHRoOmNhbGMoMTAwJSAqIDYgLyA4KTt0ZXh0LWFsaWduOmNlbnRlcn0ucGlja2VyLWhlYWRlci1jb250ZW50IC5tb250aHtmb250LXNpemU6MS43NzhyZW07bGluZS1oZWlnaHQ6Mi41cmVtO21hcmdpbi1yaWdodDouNXJlbTtmb250LXdlaWdodDo3MDB9LnBpY2tlci1oZWFkZXItY29udGVudCAueWVhcntmb250LXN0eWxlOml0YWxpYztjb2xvcjojOTk5fS5waWNrZXItY2FsZW5kYXJ7d2lkdGg6MTAwJX0ucGlja2VyLWNhbGVuZGFyIC5waWNrZXItY2FsZW5kYXItcm93e2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDt3aWR0aDoxMDAlO21hcmdpbi1ib3R0b206LjYyNXJlbX0ucGlja2VyLWNhbGVuZGFyIC5waWNrZXItd2Vla2RheXtmb250LXdlaWdodDo3MDA7dGV4dC1hbGlnbjpsZWZ0O2NvbG9yOiM5OTk7d2lkdGg6Y2FsYygxMDAlIC8gNyl9LnBpY2tlci1jYWxlbmRhciAucGlja2VyLWRheSwucGlja2VyLWNhbGVuZGFyIC5waWNrZXItbW9udGgsLnBpY2tlci1jYWxlbmRhciAucGlja2VyLXllYXJ7Zm9udC1zaXplOjEuMzMzcmVtO2xpbmUtaGVpZ2h0OjIuNXJlbTtwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6Mi41cmVtO3RleHQtYWxpZ246Y2VudGVyO2N1cnNvcjpwb2ludGVyO3dpZHRoOmNhbGMoMTAwJSAvIDcpfS5waWNrZXItY2FsZW5kYXIgLnBpY2tlci1kYXk6aG92ZXIsLnBpY2tlci1jYWxlbmRhciAucGlja2VyLW1vbnRoOmhvdmVyLC5waWNrZXItY2FsZW5kYXIgLnBpY2tlci15ZWFyOmhvdmVye2JhY2tncm91bmQ6I2IxZGNmYn0ucGlja2VyLWNhbGVuZGFyIC5vdXQtZm9jdXN7Y29sb3I6I2RkZH0ucGlja2VyLWNhbGVuZGFyIC5vdXQtZm9jdXM6aG92ZXJ7Y29sb3I6IzAwMH0ucGlja2VyLWNhbGVuZGFyIC5zZWxlY3RlZHtiYWNrZ3JvdW5kOiMwMDg5ZWM7Y29sb3I6I2ZmZn0ucGlja2VyLWNhbGVuZGFyIC5zZWxlY3RlZDpob3ZlcntiYWNrZ3JvdW5kOiMwMDg5ZWN9LnBpY2tlci1jYWxlbmRhciAudG9kYXk6OmJlZm9yZXtjb250ZW50OlwiIFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoycHg7cmlnaHQ6MnB4O3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLXRvcDouNWVtIHNvbGlkICMwMDU5YmM7Ym9yZGVyLWxlZnQ6LjVlbSBzb2xpZCB0cmFuc3BhcmVudH0ucGlja2VyLWZvb3RlcntjdXJzb3I6cG9pbnRlcn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbnt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDpjYWxjKDEwMCUgLyAzKX0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiMWRjZmJ9LnBpY2tlci1mb290ZXIgLnBpY2tlci1hY3Rpb24gLnRleHR7cGFkZGluZy1sZWZ0Oi44cmVtfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi10b2RheTo6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjA7d2lkdGg6MH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLXRvZGF5OjpiZWZvcmV7Ym9yZGVyLXRvcDouNjZlbSBzb2xpZCAjMDA1OWJjO2JvcmRlci1sZWZ0Oi42NmVtIHNvbGlkIHRyYW5zcGFyZW50fS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZXt0b3A6LS41cmVtO3dpZHRoOjFyZW07Ym9yZGVyLXRvcDozcHggc29saWQgI2UyMH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmV7d2lkdGg6MXJlbTtoZWlnaHQ6MXJlbTtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byBib3R0b20sdHJhbnNwYXJlbnQgMzUlLCM3NzcgMzUlLCM3NzcgNjUlLHRyYW5zcGFyZW50IDY1JSksbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LHRyYW5zcGFyZW50IDM1JSwjNzc3IDM1JSwjNzc3IDY1JSx0cmFuc3BhcmVudCA2NSUpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyl9YF0sXG59KVxuXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGRheU5hbWVzOiBBcnJheTxzdHJpbmc+O1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBpbml0RGF0ZTogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgbG9jYWxlID0gJ2VuJztcbiAgQElucHV0KCkgcHVibGljIHZpZXdGb3JtYXQgPSAnbGwnO1xuICBASW5wdXQoKSBwdWJsaWMgcmV0dXJuT2JqZWN0ID0gJ2pzJztcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkRhdGVQaWNrZXJDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25TZWxlY3REYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGNhbGVuZGFyRGF0ZTogTW9tZW50O1xuICBwdWJsaWMgc2VsZWN0ZWREYXRlOiBNb21lbnQ7XG4gIHB1YmxpYyBjdXJyZW50TW9udGg6IGFueSA7XG4gIHB1YmxpYyB0b2RheTogTW9tZW50O1xuICBwdWJsaWMgY3VycmVudFllYXI6IG51bWJlcjtcbiAgcHVibGljIG9uRGlzcGxheU1vbnRocyA9IGZhbHNlO1xuICBwdWJsaWMgb25EaXNwbGF5WWVhcnMgPSBmYWxzZTtcbiAgcHVibGljIGRpc3BsYXlZZWFyc0luZGV4ID0gMDtcbiAgcHVibGljIGRpc3BsYXlZZWFyUmFuZ2U6IEFycmF5PG51bWJlcj47XG4gIHB1YmxpYyBmdWxsWWVhclJhbmdlOiBBcnJheTxhbnk+O1xuICBwdWJsaWMgbW9udGhzU2hvcnQ6IEFycmF5PHN0cmluZz4gPSBtb21lbnQubW9udGhzU2hvcnQoKTtcbiAgcHVibGljIGNhbGVuZGFyRGF5czogQXJyYXk8TW9tZW50PjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRWYWx1ZSgpO1xuICAgIC8vIGRlZmF1bHQgdG8gY3VycmVudCB5ZWFyIHJhbmdlXG4gICAgXy5lYWNoKHRoaXMuZnVsbFllYXJSYW5nZSwgKHYsIGkpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFllYXIgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKS55ZWFyKCk7XG4gICAgICBpZiAodi5pbmRleE9mKHRoaXMuY3VycmVudFllYXIpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmRpc3BsYXlZZWFyUmFuZ2UgPSB0aGlzLmZ1bGxZZWFyUmFuZ2VbdGhpcy5kaXNwbGF5WWVhcnNJbmRleF07XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgcHJldigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vbkRpc3BsYXlZZWFycykge1xuICAgICAgdGhpcy5kaXNwbGF5WWVhcnNJbmRleC0tO1xuICAgICAgaWYgKHRoaXMuZGlzcGxheVllYXJzSW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5WWVhclJhbmdlID0gdGhpcy5mdWxsWWVhclJhbmdlW3RoaXMuZGlzcGxheVllYXJzSW5kZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3VidHJhY3QoMSwgJ00nKTtcbiAgICB9XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgc2hvd01vbnRoU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMub25EaXNwbGF5TW9udGhzID0gdHJ1ZTtcbiAgICB0aGlzLm9uRGlzcGxheVllYXJzID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2hvd1llYXJTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5vbkRpc3BsYXlZZWFycyA9IHRydWU7XG4gICAgdGhpcy5vbkRpc3BsYXlNb250aHMgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9uRGlzcGxheVllYXJzKSB7XG4gICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4Kys7XG4gICAgICBpZiAodGhpcy5kaXNwbGF5WWVhcnNJbmRleCA+PSB0aGlzLmZ1bGxZZWFyUmFuZ2UubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXggPSB0aGlzLmZ1bGxZZWFyUmFuZ2UubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheVllYXJSYW5nZSA9IHRoaXMuZnVsbFllYXJSYW5nZVt0aGlzLmRpc3BsYXlZZWFyc0luZGV4KytdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuYWRkKDEsICdNJyk7XG4gICAgfVxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdERheShkYXk6IE1vbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRheXNEaWZmZXJlbmNlID0gZGF5LmRpZmYodGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdGFydE9mKCdkYXRlJyksICdkYXlzJyk7XG4gICAgZGF5ID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5hZGQoZGF5c0RpZmZlcmVuY2UsICdkJyk7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKGRheSk7XG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdChzZWxlY3RlZERheSk7XG4gICAgdGhpcy5jYW5jZWxEYXRlUGlja2VyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdE1vbnRoKG1vbnRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkubW9udGgobW9udGgpO1xuICAgIHRoaXMub25EaXNwbGF5TW9udGhzID0gZmFsc2U7XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0WWVhcih5ZWFyOiBudW1iZXIpIHtcbiAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkueWVhcih5ZWFyKTtcbiAgICB0aGlzLm9uRGlzcGxheVllYXJzID0gZmFsc2U7XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0VG9kYXkoKTogdm9pZCB7XG4gICAgY29uc3QgdG9kYXkgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKG1vbWVudCgpKTtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KHRvZGF5KTtcbiAgICB0aGlzLmNhbmNlbERhdGVQaWNrZXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBwdWJsaWMgY2xlYXJQaWNrRGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KG51bGwpO1xuICAgIHRoaXMuY2FuY2VsRGF0ZVBpY2tlcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxEYXRlUGlja2VyKCk6IHZvaWQge1xuICAgIHRoaXMub25EYXRlUGlja2VyQ2FuY2VsLmVtaXQoZmFsc2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZW5lcmF0ZVllYXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbW9tZW50KCkueWVhcigpO1xuICAgIGNvbnN0IHN0YXJ0WXIgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN1YnRyYWN0KDEwMCwgJ3knKS55ZWFyKCk7XG4gICAgLy8gY29uc3QgZW5kWXIgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLmFkZCgxMCwgJ3knKS55ZWFyKCk7XG4gICAgY29uc3QgeWVhcnMgPSBbXTtcbiAgICBmb3IgKGxldCB5ZWFyID0gc3RhcnRZcjsgeWVhciA8PSBjdXJyZW50WWVhcjsgeWVhcisrKSB7XG4gICAgICB5ZWFycy5wdXNoKHllYXIpO1xuICAgIH1cblxuICAgIHRoaXMuZnVsbFllYXJSYW5nZSA9IF8uY2h1bmsoeWVhcnMsIDE0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0VmFsdWUoKSB7XG5cbiAgICAvLyBzZXQgbW9tZW50IGxvY2FsZSAoZGVmYXVsdCBpcyBlbilcbiAgICBtb21lbnQubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAvLyBzZXQgdG9kYXkgdmFsdWVcbiAgICB0aGlzLnRvZGF5ID0gbW9tZW50KCkuc3RhcnRPZignZGF0ZScpO1xuICAgIHRoaXMuY3VycmVudE1vbnRoID0gdGhpcy5tb250aHNTaG9ydFttb21lbnQoKS5tb250aCgpXTtcbiAgICB0aGlzLmN1cnJlbnRZZWFyID0gbW9tZW50KCkueWVhcigpO1xuXG4gICAgLy8gc2V0IHdlZWsgZGF5cyBuYW1lIGFycmF5XG4gICAgdGhpcy5kYXlOYW1lcyA9IG1vbWVudC53ZWVrZGF5c1Nob3J0KHRydWUpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGlucHV0IGluaXREYXRlIGhhcyB2YWx1ZVxuICAgIGlmICh0aGlzLmluaXREYXRlKSB7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMucmV0dXJuT2JqZWN0ID09PSAnc3RyaW5nJyA/IG1vbWVudCh0aGlzLmluaXREYXRlLCB0aGlzLnZpZXdGb3JtYXQpIDpcbiAgICAgICAgbW9tZW50KHRoaXMuaW5pdERhdGUpO1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ2RhdGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWxlbmRhckRhdGUgPSBtb21lbnQoKTtcbiAgICB9XG4gICAgdGhpcy5nZW5lcmF0ZVllYXJzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVDYWxlbmRhcigpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGVuZGFyRGF5cyA9IFtdO1xuICAgIGNvbnN0IHN0YXJ0ID0gMCAtICh0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJykuZGF5KCkgK1xuICAgICAoNyAtIG1vbWVudC5sb2NhbGVEYXRhKCkuZmlyc3REYXlPZldlZWsoKSkpICUgNztcbiAgICBjb25zdCBlbmQgPSA0MSArIHN0YXJ0OyAvLyBpdGVyYXRvciBlbmRpbmcgcG9pbnRcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZGF5ID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpLmFkZChpLCAnZGF5cycpO1xuICAgICAgdGhpcy5jYWxlbmRhckRheXMucHVzaChkYXkpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShkYXk6IE1vbWVudCk6IGFueSB7XG4gICAgc3dpdGNoICh0aGlzLnJldHVybk9iamVjdCkge1xuICAgICAgY2FzZSAnanMnOlxuICAgICAgICByZXR1cm4gZGF5LnRvRGF0ZSgpO1xuXG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gZGF5LmZvcm1hdCh0aGlzLnZpZXdGb3JtYXQpO1xuXG4gICAgICBjYXNlICdtb21lbnQnOlxuICAgICAgICByZXR1cm4gZGF5O1xuXG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgcmV0dXJuIGRheS50b0pTT04oKTtcblxuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICByZXR1cm4gZGF5LnRvQXJyYXkoKTtcblxuICAgICAgY2FzZSAnaXNvJzpcbiAgICAgICAgcmV0dXJuIGRheS50b0lTT1N0cmluZygpO1xuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gZGF5LnRvT2JqZWN0KCk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXk7XG4gICAgfVxuICB9XG59XG4iXX0=