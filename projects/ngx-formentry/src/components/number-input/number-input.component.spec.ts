import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let numberField: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberInputComponent]
    });

    fixture = TestBed.createComponent(NumberInputComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
    numberField = nativeEl.querySelector('div.cds--number');

    component.id = 'test-id';
    component.theme = 'light';
    component.disabled = false;
    component.skeleton = false;
    component.invalid = false;
    component.size = 'md';
    component.required = false;
    component.value = null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(numberField).toBeTruthy();
  });

  it('should render a number input with the correct attributes', () => {
    component.label = 'Pill count';
    component.value = 10;

    const input = numberField.querySelector('input[type="number"]');
    expect(input.getAttribute('id')).toBe('test-id');
    expect(input.getAttribute('type')).toBe('number');
    expect(input.getAttribute('min')).toBe(null);
    expect(input.getAttribute('max')).toBe(null);
  });

  it('should decrement and increment the value when the buttons are clicked', () => {
    component.value = 10;
    const buttons = numberField.querySelectorAll('button');
    const decrementBtn = buttons[0];
    const incrementBtn = buttons[1];

    decrementBtn.click();
    fixture.detectChanges();

    expect(component.value).toBe(9);

    decrementBtn.click();
    fixture.detectChanges();

    expect(component.value).toBe(8);

    incrementBtn.click();
    fixture.detectChanges();

    expect(component.value).toBe(9);

    incrementBtn.click();
    fixture.detectChanges();

    expect(component.value).toBe(10);
  });

  it('should not decrement the value below the min value', () => {
    component.min = 10;
    component.value = 10;
    const buttons = numberField.querySelectorAll('button');
    const decrementBtn = buttons[0];

    decrementBtn.click();
    fixture.detectChanges();

    expect(component.value).toBe(10);

    decrementBtn.click();
    fixture.detectChanges();

    expect(component.value).not.toBe(9);
    expect(component.value).toBe(10);
  });

  it('should not increment the value above the max value', () => {
    component.max = 10;
    component.value = 10;
    const buttons = numberField.querySelectorAll('button');
    const incrementBtn = buttons[1];

    incrementBtn.click();
    fixture.detectChanges();

    expect(component.value).toBe(10);

    incrementBtn.click();
    fixture.detectChanges();

    expect(component.value).not.toBe(11);
    expect(component.value).toBe(10);
  });

  it('should decrement or increment the value by the step count value', () => {
    component.step = 5;
    component.value = 10;
    const buttons = numberField.querySelectorAll('button');
    const decrementBtn = buttons[0];
    const incrementBtn = buttons[1];

    decrementBtn.click();
    fixture.detectChanges();

    expect(component.value).toBe(5);

    incrementBtn.click();
    fixture.detectChanges();

    expect(component.value).toBe(10);
  });

  it('should render helperText below the input when provided', () => {
    component.value = 49;
    component.max = 50;
    component.helperText = 'Max of 50';

    fixture.detectChanges();

    const helperText = numberField.querySelector('div.cds--form__helper-text');
    expect(helperText.textContent).toBe('Max of 50');
  });

  it('should render the supplied warning text when the warn input is true', () => {
    component.value = 11;
    component.max = 10;
    component.warn = true;
    component.warnText = 'Min value should be 10';

    numberField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    fixture.detectChanges();

    const warnText = numberField.querySelector('div.cds--form-requirement');
    expect(warnText.textContent).toBe('Min value should be 10');
  });

  it('should render the supplied invalid text when the invalid input is true', () => {
    component.value = 11;
    component.max = 10;
    component.invalid = true;
    component.invalidText = 'Min value should be 10';

    numberField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    fixture.detectChanges();

    const invalidText = numberField.querySelector('div.cds--form-requirement');
    expect(invalidText.textContent).toBe('Min value should be 10');
  });
});
