import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxControlComponent } from './checkbox.component';

describe('CheckboxControlComponent', () => {
  let component: CheckboxControlComponent;
  let fixture: ComponentFixture<CheckboxControlComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let fieldset: HTMLElement;
  let checkboxes: NodeListOf<HTMLInputElement>;
  let labels: NodeListOf<HTMLLabelElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxControlComponent]
    });

    fixture = TestBed.createComponent(CheckboxControlComponent);
    component = fixture.componentInstance;

    component.options = [
      {
        label: 'Cohabitating',
        value: 'a899af10-1350-11df-a1f1-0026b9348838',
        disableWhenExpression:
          "myValue === 'a899ae34-1350-11df-a1f1-0026b9348838'",
        isDisabled: false
      },
      {
        label: 'Divorced',
        value: 'a899ad58-1350-11df-a1f1-0026b9348838',
        disableWhenExpression:
          "myValue === 'a899ae34-1350-11df-a1f1-0026b9348838'",
        isDisabled: false
      },
      {
        label: 'Married monogamous',
        value: 'a8aa76b0-1350-11df-a1f1-0026b9348838',
        disableWhenExpression:
          "myValue === 'a899ae34-1350-11df-a1f1-0026b9348838'",
        isDisabled: false
      },
      {
        label: 'Married polygamous',
        value: 'a8b03712-1350-11df-a1f1-0026b9348838',
        disableWhenExpression:
          "myValue === 'a899ae34-1350-11df-a1f1-0026b9348838'",
        isDisabled: false
      },
      {
        label: 'Separated',
        value: 'a899aba0-1350-11df-a1f1-0026b9348838',
        disableWhenExpression:
          "myValue === 'a899ae34-1350-11df-a1f1-0026b9348838'",
        isDisabled: false
      },
      {
        label: 'Single',
        value: 'a899ac7c-1350-11df-a1f1-0026b9348838',
        disableWhenExpression:
          "myValue === 'a899ae34-1350-11df-a1f1-0026b9348838'",
        isDisabled: false
      },
      {
        label: 'Other',
        value: 'a899ae34-1350-11df-a1f1-0026b9348838',
        isDisabled: false
      }
    ];

    fixture.detectChanges();

    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
    fieldset = nativeEl.querySelector('fieldset');
    checkboxes = fieldset.querySelectorAll('input[type=checkbox]');
    labels = fieldset.querySelectorAll('label');
  });

  it('should display by default', () => {
    expect(component).toBeTruthy();
    expect(fieldset).toBeTruthy();
  });

  it('should display the correct number of checkboxes', () => {
    expect(checkboxes.length).toBe(7);
    expect(labels[0].textContent).toEqual('Cohabitating');
    expect(labels[1].textContent).toEqual('Divorced');
    expect(labels[2].textContent).toEqual('Married monogamous');
    expect(labels[3].textContent).toEqual('Married polygamous');
    expect(labels[4].textContent).toEqual('Separated');
    expect(labels[5].textContent).toEqual('Single');
    expect(labels[6].textContent).toEqual('Other');
  });

  it('should display check marks next to the checked options', () => {
    const cohabitatingOption = checkboxes[0];
    const divorcedOption = checkboxes[1];
    const monogamousOption = checkboxes[2];

    expect(cohabitatingOption.checked).toBeFalsy();
    expect(divorcedOption.checked).toBeFalsy();

    cohabitatingOption.click();
    monogamousOption.click();

    fixture.detectChanges();

    expect(cohabitatingOption.checked).toBeTruthy();
    expect(monogamousOption.checked).toBeTruthy();
    expect(divorcedOption.checked).toBeFalsy();
  });

  it('should disable options based on the disableWhenExpression', () => {
    const cohabitatingOption = checkboxes[0];
    const divorcedOption = checkboxes[1];
    const monogamousOption = checkboxes[2];
    const otherOption = checkboxes[6];

    otherOption.click();

    fixture.detectChanges();

    expect(otherOption.checked).toBeTruthy();
    expect(cohabitatingOption.disabled).toBeTruthy();
    expect(divorcedOption.disabled).toBeTruthy();
    expect(monogamousOption.disabled).toBeTruthy();
  });
});
