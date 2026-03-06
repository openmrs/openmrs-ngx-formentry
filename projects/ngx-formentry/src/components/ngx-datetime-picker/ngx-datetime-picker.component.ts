import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';

@Component({
    selector: 'ofe-ngx-date-time-picker',
    templateUrl: './ngx-datetime-picker.html',
    styleUrls: ['./ngx-datetime-picker.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxDatetimeComponent),
            multi: true
        }
    ],
    standalone: false
})
export class NgxDatetimeComponent implements ControlValueAccessor {
  value = '';
  isDisabled = false;
  // calendarEvents = [{ name: "Mashujaa Day", date: "2016-12-12" }, { name: "Christmas Day", date: "2016-12-25" }, { name: "Boxing Day", date: "2016-12-26" }, { name: "New Year Day", date: "2017-01-01" }]
  @Input() id = '';
  @Input() theme = 'dark';
  @Input() datePickerFormat = '';
  @Input() showWeeks = false;
  @Input() weeks: number[];
  private observer: MutationObserver | null = null;
  private _dataSource: Array<object>;
  @Input()
  public get dataSource(): any {
    return this._dataSource || [];
  }
  public set dataSource(v: any) {
    this._dataSource = v;
  }

  onChange = (_: any) => {};
  onTouch = () => {};
  onInput($event: any) {
    this.onTouch();
    this.onChange(moment($event.value).format());
  }

  onPickerOpen($event: any) {
    this.highlightEventDates();
    const calendarBody = document.querySelector('.owl-dt-calendar-main');
    if (calendarBody) {
      this.observer = new MutationObserver(() => {
        this.highlightEventDates();
      });
      this.observer.observe(calendarBody, {
        childList: true,
        subtree: true
      });
    }
  }

  onPickerClose($event: any) {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  highlightEventDates(): void {
    const isMultiYearView = !!document.querySelector(
      '.owl-dt-calendar-multi-year-view'
    );
    if (isMultiYearView) {
      return;
    }

    const cells = document.querySelectorAll('.owl-dt-calendar-cell');
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const date = new Date(cell.getAttribute('aria-label'));
      const cellDate = moment(date).format('YYYY-MM-DD');
      const events = this.dataSource.filter(
        (d) => moment(d.date).format('YYYY-MM-DD') === cellDate
      );
      if (events.length > 0) {
        const eventName = events
          .map((h) => h.name)
          .sort()
          .join('\n\n');

        cell.classList.add('highlight-date');
        cell.setAttribute('data-tooltip', eventName);
      }
    }
  }

  writeValue(value: any): void {
    if (value && value !== '') {
      this.value = moment(value).format();
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onWeeksSelected(numberOfWeeks: number) {
    const currentDate: string = new Date().toString();
    this.onInput({ value: moment(currentDate).add(numberOfWeeks, 'weeks') });
  }

  getPlaceholderValue(): string {
    if (this.datePickerFormat === 'both') {
      return 'dd/mm/yyyy hh:mm';
    } else if (this.datePickerFormat === 'timer') {
      return 'hh:mm';
    } else {
      return 'dd/mm/yyyy';
    }
  }
}
