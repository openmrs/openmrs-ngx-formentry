import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { FormEntryModule } from '../form-entry.module';
import { FormFactory } from './form.factory';
import { Form } from './form';

describe('Reference ranges in a form', () => {
  let factory: FormFactory;

  function question(rendering = 'number', enabled?: boolean) {
    return {
      id: 'temperature',
      label: 'Temperature',
      type: 'obs',
      questionOptions: {
        rendering,
        concept: 'temperature-uuid',
        min: 0,
        conceptReferenceRange: {
          lowNormal: 36,
          hiNormal: 37.5,
          lowCritical: 35,
          hiCritical: 40,
          units: '°C'
        }
      },
      alert: {
        useConceptReferenceRange: enabled,
        alertWhenExpression: 'myValue > 38',
        message: 'Call the clinician'
      }
    };
  }

  function createForm(questions: unknown[]): Form {
    return factory.createForm({
      name: 'Vitals',
      pages: [
        {
          label: 'Vitals',
          sections: [{ label: 'Vitals', isExpanded: 'true', questions }]
        }
      ]
    });
  }

  function controlFor(
    form: Form,
    id = 'temperature',
    index = 0
  ): AfeFormControl {
    const control = form.searchNodeByQuestionId(id)[index].control;
    if (!(control instanceof AfeFormControl)) {
      throw new Error('Expected a numeric control');
    }
    return control;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormEntryModule, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    factory = TestBed.inject(FormFactory);
  });

  ['number', 'decimal', 'numeric'].forEach((rendering) => {
    it(`updates warnings alongside the expression alert for ${rendering}`, () => {
      const control = controlFor(createForm([question(rendering, true)]));
      control.setValue(40);
      expect(control.alert).toBe('Call the clinician');
      const rangeAlert = control.alerts.find(
        (alert) => alert.source === 'conceptReferenceRange'
      );
      expect(rangeAlert.shown).toBe(true);
      expect(rangeAlert.alertMessage).toBe('referenceRangeCriticalHigh');
      expect(control.valid).toBe(true);

      control.setValue(38);
      expect(control.alert).toBe('');
      expect(rangeAlert.alertMessage).toBe('referenceRangeHigh');
      expect(rangeAlert.shown).toBe(true);

      control.setValue(37);
      expect(rangeAlert.shown).toBe(false);
      control.setValue('');
      expect(rangeAlert.shown).toBe(false);
    });
  });

  [undefined, false].forEach((enabled) => {
    it(`preserves expression alerts and absolute validation when the option is ${enabled}`, () => {
      const control = controlFor(createForm([question('number', enabled)]));
      control.setValue(40);
      expect(control.alert).toBe('Call the clinician');
      expect(
        control.alerts.some((alert) => alert.source === 'conceptReferenceRange')
      ).toBe(false);
      control.setValue(-1);
      expect(control.hasError('min')).toBe(true);
      control.setValue(0);
      expect(control.valid).toBe(true);
    });
  });

  it('allows a reference-range-only alert when no range is available', () => {
    const schemaQuestion = question('number', true);
    delete schemaQuestion.alert.alertWhenExpression;
    delete schemaQuestion.questionOptions.conceptReferenceRange;
    const control = controlFor(createForm([schemaQuestion]));
    control.setValue(40);
    expect(control.alerts.length).toBe(1);
    expect(control.alerts[0].shown).toBe(false);
    expect(control.valid).toBe(true);
  });

  it('validates a single upper bound without requiring a lower bound', () => {
    const schemaQuestion = {
      id: 'pulse',
      type: 'obs',
      questionOptions: { rendering: 'number', max: 0 }
    };
    const control = controlFor(createForm([schemaQuestion]), 'pulse');
    control.setValue(1);
    expect(control.hasError('max')).toBe(true);
    control.setValue(0);
    expect(control.valid).toBe(true);
  });

  it('replaces reference limits without retaining an older limit or widening the schema limit', () => {
    const schemaQuestion = question('number', false);
    schemaQuestion.questionOptions.min = 10;
    const control = controlFor(createForm([schemaQuestion]));
    control.conceptReferenceRange = { lowAbsolute: 0, hiAbsolute: 40 };
    control.setValue(40);
    expect(control.valid).toBe(true);
    control.setValue(45);
    expect(control.hasError('max')).toBe(true);
    control.conceptReferenceRange = { lowAbsolute: 0, hiAbsolute: 50 };
    control.updateValueAndValidity();
    expect(control.valid).toBe(true);
    control.setValue(5);
    expect(control.hasError('min')).toBe(true);
  });

  it('wires warnings for nested and newly added repeated questions', () => {
    const form = createForm([
      {
        id: 'nested',
        type: 'obsGroup',
        questionOptions: { rendering: 'group' },
        questions: [question('decimal', true)]
      },
      {
        id: 'repeat',
        type: 'obsGroup',
        questionOptions: { rendering: 'repeating' },
        questions: [{ ...question('number', true), id: 'repeatTemperature' }]
      }
    ]);
    form.searchNodeByQuestionId('repeat')[0].createChildNode();
    form.searchNodeByQuestionId('repeat')[0].createChildNode();
    const nested = controlFor(form);
    const repeated = controlFor(form, 'repeatTemperature', 1);
    nested.setValue(40);
    repeated.setValue(34);
    expect(
      nested.alerts.find((alert) => alert.source === 'conceptReferenceRange')
        .alertMessage
    ).toBe('referenceRangeCriticalHigh');
    expect(
      repeated.alerts.find((alert) => alert.source === 'conceptReferenceRange')
        .alertMessage
    ).toBe('referenceRangeCriticalLow');
  });
});
