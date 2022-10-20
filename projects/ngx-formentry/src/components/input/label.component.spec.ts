import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Label } from './label.component';

describe('Label', () => {
  let component: Label;
  let fixture: ComponentFixture<Label>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Label],
      imports: [],
      providers: []
    });

    fixture = TestBed.createComponent(Label);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('label'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should work', () => {
    expect(component instanceof Label).toBe(true);
  });

  // This functionality isn't replicated in the Carbon UI
  // it('should set icon to success', () => {
  //   component.labelState = 'success';
  //   fixture.detectChanges();
  //   expect(el.querySelector('.label-icon-success')).toBeTruthy();
  // });

  // it('should set icon to warning', () => {
  //   component.labelState = 'warning';
  //   fixture.detectChanges();
  //   expect(el.querySelector('.label-icon-warning')).toBeTruthy();
  // });

  // it('should set icon to error', () => {
  //   component.labelState = 'error';
  //   fixture.detectChanges();
  //   expect(el.querySelector('.label-icon-error')).toBeTruthy();
  // });
});
