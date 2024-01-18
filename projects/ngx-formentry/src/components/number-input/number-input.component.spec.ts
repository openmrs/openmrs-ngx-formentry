import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let containerElement: HTMLElement;
  let inputElement: HTMLInputElement;
  let incrementButton: HTMLButtonElement;
  let decrementButton: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberInputComponent]
    });

    fixture = TestBed.createComponent(NumberInputComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
    containerElement = nativeEl.querySelector('div.cds--number');
    inputElement = containerElement.querySelector('input[type="number"]');
    incrementButton = containerElement.querySelector('button.up-icon');
    decrementButton = containerElement.querySelector('button.down-icon');
    component.id = 'test-id';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component instanceof NumberInputComponent).toBe(true);
    expect(inputElement).toBeDefined();
  });

  it('should render a number input with the correct attributes', () => {
    component.value = 10;
    component.label = 'Pill count';
    component.placeholder = 'Enter pill count';

    fixture.detectChanges();

    expect(inputElement.getAttribute('id')).toBe('test-id');
    expect(inputElement.getAttribute('type')).toBe('number');
    expect(inputElement.getAttribute('min')).toBe(null);
    expect(inputElement.getAttribute('max')).toBe(null);
    expect(inputElement.getAttribute('placeholder')).toBe('Enter pill count');
  });

  it('should decrement and increment the value when the buttons are clicked', () => {
    component.value = 10;

    decrementButton.click();
    fixture.detectChanges();

    expect(component.value).toBe(9);

    decrementButton.click();
    fixture.detectChanges();

    expect(component.value).toBe(8);

    incrementButton.click();
    fixture.detectChanges();

    expect(component.value).toBe(9);

    incrementButton.click();
    fixture.detectChanges();

    expect(component.value).toBe(10);
  });

  it('should not decrement the value below the min value', () => {
    component.value = 10;
    component.min = 10;

    decrementButton.click();
    fixture.detectChanges();

    expect(component.value).toBe(10);

    decrementButton.click();
    fixture.detectChanges();

    expect(component.value).not.toBe(9);
    expect(component.value).toBe(10);
  });

  it('should not increment the value above the max value', () => {
    component.value = 10;
    component.max = 10;

    incrementButton.click();
    fixture.detectChanges();

    expect(component.value).toBe(10);

    incrementButton.click();
    fixture.detectChanges();

    expect(component.value).not.toBe(11);
    expect(component.value).toBe(10);
  });

  it('should decrement or increment the value by the provided step count', () => {
    component.value = 10;
    component.step = 5;

    decrementButton.click();
    fixture.detectChanges();

    expect(component.value).toBe(5);

    incrementButton.click();
    fixture.detectChanges();

    expect(component.value).toBe(10);
  });

  it('should render helperText below the input when provided', () => {
    const helperText = 'Max of 50';
    component.value = 49;
    component.max = 50;
    component.helperText = helperText;

    fixture.detectChanges();

    const helperTextElement = containerElement.querySelector(
      'div.cds--form__helper-text'
    );
    expect(containerElement.className.includes('cds--number--helpertext'));
    expect(helperTextElement.textContent).toBe(helperText);
  });

  it('should render the supplied warning text when the warn property is truthy', () => {
    component.value = 11;
    component.max = 10;
    component.warn = true;
    component.warnText = 'Min value should be 10';

    containerElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab' })
    );
    fixture.detectChanges();

    const warnText = containerElement.querySelector(
      'div.cds--form-requirement'
    );
    expect(warnText.textContent).toBe('Min value should be 10');
  });

  it('should render the supplied invalid text when the invalid property is truthy', () => {
    component.value = 11;
    component.max = 10;
    component.invalid = true;
    component.invalidText = 'Min value should be 10';

    containerElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab' })
    );
    fixture.detectChanges();

    const invalidText = containerElement.querySelector(
      'div.cds--form-requirement'
    );
    expect(invalidText.textContent).toBe('Min value should be 10');
  });
});
