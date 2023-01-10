/**
 * date-picker.component.spec
 */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';
import { By } from '@angular/platform-browser';
import { MomentPipe } from '../pipes/moment.pipe';
import { ModalComponent } from '../picker-modal/modal.component';
import moment, { Moment } from 'moment';

describe('DatePickerComponent', () => {
  let comp: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent, ModalComponent, MomentPipe]
    });

    fixture = TestBed.createComponent(DatePickerComponent);

    comp = fixture.componentInstance; // DatePickerComponent test instance
  });

  it('should display display 42 picker days', () => {
    fixture.detectChanges();
    const pickerDayEls = fixture.debugElement.queryAll(By.css('.picker-day'));
    expect(pickerDayEls.length).toBe(42);
  });

  it('should have a button named "Today"', () => {
    const todayBtnEl = fixture.debugElement.query(By.css('.action-today'));
    expect(todayBtnEl.nativeElement.textContent).toBe('Today');
  });

  it('should fire a dateSelect event when "Today" button clicked', () => {
    let selectedDateValue: any;
    comp.dateSelect.subscribe((date: any) => (selectedDateValue = date));
    expect(selectedDateValue).toBeUndefined();
    const todayBtnEl = fixture.debugElement.query(By.css('.action-today'));
    todayBtnEl.triggerEventHandler('click', null);
    expect(selectedDateValue).toBeDefined();
  });

  it('should have a button named "Clear"', () => {
    const clearBtnEl = fixture.debugElement.query(By.css('.action-clear'));
    expect(clearBtnEl.nativeElement.textContent).toBe('Clear');
  });

  it('should fire a dateSelect event when "Clear" button clicked', () => {
    let selectedDateValue: any;
    comp.dateSelect.subscribe((date: any) => (selectedDateValue = date));
    const clearBtnEl = fixture.debugElement.query(By.css('.action-clear'));
    clearBtnEl.triggerEventHandler('click', null);
    expect(selectedDateValue).toBeNull();
  });

  it('should have a button named "Close"', () => {
    const closeBtnEl = fixture.debugElement.query(By.css('.action-close'));
    expect(closeBtnEl.nativeElement.textContent).toBe('Close');
  });

  it('should fire a datePickerCancel event when "Close" button clicked', () => {
    let pickerStatus: boolean;
    comp.datePickerCancel.subscribe(
      (status: boolean) => (pickerStatus = status)
    );
    const closeBtnEl = fixture.debugElement.query(By.css('.action-close'));
    closeBtnEl.triggerEventHandler('click', null);
    expect(pickerStatus).toBeFalsy();
  });

  it('should display current month if the initDate is not set', () => {
    fixture.detectChanges();
    expect(comp.initDate).toBeUndefined();
    const monthEl = fixture.debugElement.query(By.css('.month'));
    expect(monthEl.nativeElement.textContent).toBe(moment().format('MMMM'));
  });

  it("should display initDate's month if the initDate is set", () => {
    const displayMonthValue = moment().add(1, 'm').format('MMMM');
    comp.initDate = moment().add(1, 'm').format(comp.viewFormat);
    comp.returnObject = 'string';
    fixture.detectChanges();
    expect(comp.initDate).toBeDefined();
    const monthEl = fixture.debugElement.query(By.css('.month'));
    expect(monthEl.nativeElement.textContent).toBe(displayMonthValue);
  });

  it('should display current year if the initDate is not set', () => {
    fixture.detectChanges();
    expect(comp.initDate).toBeUndefined();
    const yearEl = fixture.debugElement.query(By.css('.year'));
    expect(yearEl.nativeElement.textContent).toBe(moment().format('YYYY'));
  });

  it("should display initDate's year if the initDate is set", () => {
    const displayYearValue = moment().add(1, 'y').format('YYYY');
    comp.initDate = moment().add(1, 'y').format(comp.viewFormat);
    comp.returnObject = 'string';
    fixture.detectChanges();
    expect(comp.initDate).toBeDefined();
    const yearEl = fixture.debugElement.query(By.css('.year'));
    expect(yearEl.nativeElement.textContent).toBe(displayYearValue);
  });

  it('should display next month calendar if the nav-next button was clicked', () => {
    comp.initDate = moment().format(comp.viewFormat);
    comp.returnObject = 'string';
    fixture.detectChanges();

    const navNextEl = fixture.debugElement.query(By.css('.nav-next'));
    navNextEl.triggerEventHandler('click', null);

    const monthEl = fixture.debugElement.query(By.css('.month'));
    expect(monthEl.nativeElement.textContent).toBe(
      moment().add(1, 'm').format('MMMM')
    );
  });

  it('should display previous month calendar if the nav-prev button was clicked', () => {
    comp.initDate = moment().format(comp.viewFormat);
    comp.returnObject = 'string';
    fixture.detectChanges();

    const navNextEl = fixture.debugElement.query(By.css('.nav-prev'));
    navNextEl.triggerEventHandler('click', null);

    const monthEl = fixture.debugElement.query(By.css('.month'));
    expect(monthEl.nativeElement.textContent).toBe(
      moment().subtract(1, 'm').format('MMMM')
    );
  });

  it('should set selected picker-day element to has "selected" class', () => {
    let selectedIndex: number;
    const initMoment = moment().add(1, 'd');
    comp.initDate = initMoment.format(comp.viewFormat);
    comp.returnObject = 'string';
    fixture.detectChanges();
    comp.calendarDays.map((day: Moment, index: number) => {
      if (day.format(comp.viewFormat) === initMoment.format(comp.viewFormat)) {
        selectedIndex = index;
      }
    });
    expect(selectedIndex).toBeDefined();
    const allPickerDayEl = fixture.debugElement.queryAll(By.css('.picker-day'));
    expect(allPickerDayEl[selectedIndex].nativeElement.className).toContain(
      'selected'
    );
  });

  it('should set today picker-day element to has "today" class', () => {
    let todayIndex: number;
    const todayMoment = moment();
    comp.initDate = todayMoment.format(comp.viewFormat);
    comp.returnObject = 'string';
    fixture.detectChanges();
    comp.calendarDays.map((day: Moment, index: number) => {
      if (day.format(comp.viewFormat) === todayMoment.format(comp.viewFormat)) {
        todayIndex = index;
      }
    });
    expect(todayIndex).toBeDefined();
    const allPickerDayEl = fixture.debugElement.queryAll(By.css('.picker-day'));
    expect(allPickerDayEl[todayIndex].nativeElement.className).toContain(
      'today'
    );
  });

  it('should set not-current-month picker-day elements to has "out-focus" class', () => {
    const notCurrentMonthDaysIndex: number[] = [];
    const todayMoment = moment();
    comp.initDate = todayMoment.format(comp.viewFormat);
    comp.returnObject = 'string';
    fixture.detectChanges();
    comp.calendarDays.map((day: Moment, index: number) => {
      if (day.format('MMMM') !== todayMoment.format('MMMM')) {
        notCurrentMonthDaysIndex.push(index);
      }
    });
    const allPickerDayEl = fixture.debugElement.queryAll(By.css('.picker-day'));
    notCurrentMonthDaysIndex.map((i: number) => {
      expect(allPickerDayEl[i].nativeElement.className).toContain('out-focus');
    });
  });
});
