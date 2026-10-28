import {
  ConceptReferenceRange,
  evaluateConceptReferenceRange
} from './concept-reference-range-alert';

describe('Concept reference range warnings', () => {
  const range: ConceptReferenceRange = {
    lowNormal: 36,
    hiNormal: 37.5,
    lowCritical: 35,
    hiCritical: 40,
    units: '°C'
  };

  ([
    {
      value: 35,
      severity: 'critical',
      message: 'referenceRangeCriticalLow',
      limit: 35
    },
    {
      value: 35.5,
      severity: 'warning',
      message: 'referenceRangeLow',
      limit: 36
    },
    {
      value: 38,
      severity: 'warning',
      message: 'referenceRangeHigh',
      limit: 37.5
    },
    {
      value: 40,
      severity: 'critical',
      message: 'referenceRangeCriticalHigh',
      limit: 40
    },
    {
      value: '42',
      severity: 'critical',
      message: 'referenceRangeCriticalHigh',
      limit: 40
    }
  ] as const).forEach(({ value, severity, message, limit }) => {
    it(`classifies ${value} and reports the relevant limit and units`, () => {
      expect(evaluateConceptReferenceRange(value, range)).toEqual({
        severity,
        alertMessage: message,
        limit,
        units: '°C'
      });
    });
  });

  [36, 37, 37.5, '', ' ', null, undefined, NaN, Infinity, 'abc', false].forEach(
    (value) => {
      it(`does not warn for a normal or absent numeric answer (${String(
        value
      )})`, () => {
        expect(evaluateConceptReferenceRange(value, range)).toBeNull();
      });
    }
  );

  it('uses a single configured limit, including zero', () => {
    expect(evaluateConceptReferenceRange(0, { lowCritical: 0 })).toEqual({
      severity: 'critical',
      alertMessage: 'referenceRangeCriticalLow',
      limit: 0,
      units: ''
    });
    expect(evaluateConceptReferenceRange(-1, { hiNormal: 0 })).toBeNull();
    expect(
      evaluateConceptReferenceRange(1, { hiNormal: 0 })?.alertMessage
    ).toBe('referenceRangeHigh');
  });

  it('ignores missing or invalid limits without suppressing other configured limits', () => {
    expect(
      evaluateConceptReferenceRange(40, {
        lowNormal: null,
        hiNormal: 37.5,
        hiCritical: NaN
      })?.severity
    ).toBe('warning');
    expect(evaluateConceptReferenceRange(40, {})).toBeNull();
    expect(evaluateConceptReferenceRange(40)).toBeNull();
  });

  it('trims whitespace around the units', () => {
    expect(
      evaluateConceptReferenceRange(38, { hiNormal: 37.5, units: ' °C ' })
        ?.units
    ).toBe('°C');
  });
});
