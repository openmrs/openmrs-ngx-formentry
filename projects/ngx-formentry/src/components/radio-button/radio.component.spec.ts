import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonControlComponent } from './radio.component';

describe('RadioButtonControlComponent', () => {
  let component: RadioButtonControlComponent;
  let fixture: ComponentFixture<RadioButtonControlComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let fieldset: HTMLElement;
  let labels: NodeListOf<HTMLLabelElement>;
  let radioButtons: NodeListOf<HTMLInputElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioButtonControlComponent]
    });

    fixture = TestBed.createComponent(RadioButtonControlComponent);
    component = fixture.componentInstance;

    component.options = [
      {
        label: 'Confirmed',
        value: 'CONFIRMED'
      },
      {
        label: 'Provisional',
        value: 'PROVISIONAL'
      }
    ];

    fixture.detectChanges();

    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
    fieldset = nativeEl.querySelector('fieldset');
    labels = nativeEl.querySelectorAll('label');
    radioButtons = nativeEl.querySelectorAll('input[type="radio"]');
  });

  it('should create the radio component', () => {
    expect(component).toBeTruthy();
    expect(fieldset).toBeTruthy();
  });

  it('should render a radio button for each option', () => {
    expect(labels.length).toEqual(2);
    expect(labels[0].textContent).toContain('Confirmed');
    expect(labels[1].textContent).toContain('Provisional');
  });

  it('should only allow one option to be selected', () => {
    expect(radioButtons.length).toEqual(2);
    const confirmedButton = radioButtons[0];
    const provisionalButton = radioButtons[1];

    confirmedButton.click();

    fixture.detectChanges();

    expect(confirmedButton.checked).toBe(true);
    expect(provisionalButton.checked).toBe(false);

    provisionalButton.click();

    fixture.detectChanges();

    expect(provisionalButton.checked).toBe(true);
    expect(confirmedButton.checked).toBe(false);
  });
});
