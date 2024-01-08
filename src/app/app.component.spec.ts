import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormEntryModule } from 'projects/ngx-formentry/src/public_api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';

const adultReturnVisitForm = require('./schemas/adult-1.6.json');

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let cancelBtn: HTMLButtonElement;
  let saveBtn: HTMLButtonElement;
  let tab: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        FormEntryModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
    cancelBtn = nativeEl.querySelector('button.cds--btn--secondary');
    saveBtn = nativeEl.querySelector('button.cds--btn--primary');
    tab = nativeEl.querySelector('div.tab');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(component.schema).toEqual(adultReturnVisitForm);
    expect(cancelBtn.textContent).toMatch(/Cancel/i);
    expect(saveBtn.textContent).toMatch(/Save/i);
    expect(tab).toBeTruthy();
    expect(tab.textContent).toContain('Encounter Details');
    expect(tab.textContent).toContain('Pre-Clinic Review');
    expect(tab.textContent).toContain('Clinical History');
    expect(tab.textContent).toContain('Medication History');
    expect(tab.textContent).toContain('Vitals');
    expect(tab.textContent).toContain('Current Symptoms');
    expect(tab.textContent).toContain('Test Results');
    expect(tab.textContent).toContain('Assessment');
    expect(tab.textContent).toContain('Medication Plan');
    expect(tab.textContent).toContain('Plan');
    expect(tab.textContent).toContain('Primary Diagnoses');
    expect(tab.textContent).toContain('Secondary Diagnoses');
    expect(tab.textContent).toContain(
      'Combined Diagnosis, Certainty, and Rank'
    );
  });

  it('submitting the form without filling in required fields should raise validation errors', () => {
    saveBtn.click();
    fixture.detectChanges();

    const errorContainer = nativeEl.querySelector('div.container');
    expect(errorContainer.textContent).toContain('requiredField');
    expect(errorContainer.textContent).toContain('Discordant couple');
    expect(errorContainer.textContent).toContain(
      'Prevention with positives: At risk population'
    );
    expect(errorContainer.textContent).toContain(
      'Prevention with positives: PWP services'
    );
  });
});
