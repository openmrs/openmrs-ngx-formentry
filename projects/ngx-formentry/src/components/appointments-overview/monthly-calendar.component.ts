import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import moment from 'moment';

interface CalendarDay {
  date: Date;
  appointmentCount: number;
}

interface Appointment {
  date: Date | string;
  count: number;
}

@Component({
  selector: 'app-monthly-calendar',
  template: `
    <div class="calendar">
      <div class="header">
        <button (click)="previousMonth()">&lt;</button>
        <h5>
          {{
            currentMonth.toLocaleString('default', {
              month: 'long',
              year: 'numeric'
            })
          }}
        </h5>
        <button (click)="nextMonth()">&gt;</button>
      </div>
      <div class="weekdays">
        <div *ngFor="let day of weekdays">{{ day | translate }}</div>
      </div>
      <div class="days">
        <div
          *ngFor="let day of calendarDays"
          class="day"
          [class.current-month]="
            day.date.getMonth() === currentMonth.getMonth()
          "
          [class.today]="isToday(day.date)"
          [class.selected]="isSameDay(day.date, currentMonth)"
          (click)="onDayClick(day)"
        >
          <span class="date">{{ day.date.getDate() }}</span>
          <span *ngIf="day.appointmentCount > 0" class="appointment-count">{{
            day.appointmentCount
          }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./monthly-calendar.component.scss']
})
export class MonthlyCalendarComponent implements OnInit {
  @Input() currentMonth: Date = new Date();
  @Input() appointments: Appointment[] = [];

  @Output() daySelected = new EventEmitter<Date>();

  calendarDays: CalendarDay[] = [];
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    this.calendarDays = [];

    // Add days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      this.calendarDays.push({
        date,
        appointmentCount: this.getAppointmentCount(date)
      });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      this.calendarDays.push({
        date,
        appointmentCount: this.getAppointmentCount(date)
      });
    }

    // Add days from next month
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      this.calendarDays.push({
        date,
        appointmentCount: this.getAppointmentCount(date)
      });
    }
  }

  getAppointmentCount(date: Date): number {
    const appointment = this.appointments.find((a) =>
      this.isSameDay(this.parseDate(a.date), date)
    );
    return appointment ? appointment.count : 0;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isToday(date: Date): boolean {
    return moment(date).isSame(new Date(), 'day');
  }

  parseDate(date: Date | string): Date {
    if (date instanceof Date) {
      return date;
    }
    return new Date(date);
  }

  previousMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendarDays();
  }

  onDayClick(day: CalendarDay) {
    this.daySelected.emit(day.date);
  }
}
