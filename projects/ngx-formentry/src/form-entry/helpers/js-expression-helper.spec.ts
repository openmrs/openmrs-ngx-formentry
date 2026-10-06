import { TestBed } from '@angular/core/testing';

import { JsExpressionHelper } from './js-expression-helper';
import {
  ExpressionRunner,
  Runnable
} from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension';

describe('JS Expression Helper Service:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsExpressionHelper, ExpressionRunner]
    });
  });

  it('should be defined', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);
    expect(helper).toBeTruthy();
  });

  it('should return the correct bmi when height and weight are provided', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

    const height = 180; // cm
    const weight = 70; // kgs

    const bmi = helper.calcBMI(height, weight);
    expect(bmi).toBe(21.6);
  });

  it('should compute the correct bsa value when height and weight are provided', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

    let bsa, height, weight;

    bsa = helper.calcBSA(height, weight);
    expect(bsa).toBeNull();

    height = 190.5; // cm
    weight = 95; // kg

    bsa = helper.calcBSA(height, weight);
    expect(bsa).toBe(2.24);
  });

  it('should return a value given an encounter payload and a concept uuid', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

    let obsValue;

    obsValue = helper.getObsFromControlOrEncounter(
      null,
      {
        obs: [
          {
            uuid: '0bc6ef97-7727-4787-8c16-fc21460ccdydfd',
            obsDatetime: '2016-01-21T01:17:46.000+0300',
            concept: {
              uuid: '5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
            },
            value: 173,
            groupMembers: null
          }
        ]
      },
      '5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    );
    expect(obsValue).toBeTruthy();

    expect(obsValue).toBe(173);
  });

  it('should preserve falsy control and observation values', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);
    const encounter = {
      obs: [
        {
          concept: { uuid: '5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
          value: 0,
          groupMembers: null
        }
      ]
    };

    // A falsy target control value is still a value
    expect(
      helper.getObsFromControlOrEncounter(0, encounter, 'irrelevant-uuid')
    ).toBe(0);
    expect(
      helper.getObsFromControlOrEncounter(false, encounter, 'irrelevant-uuid')
    ).toBe(false);

    // A falsy observation value is returned rather than null
    expect(
      helper.getObsFromControlOrEncounter(
        null,
        encounter,
        '5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      )
    ).toBe(0);

    // Nothing found still returns null
    expect(
      helper.getObsFromControlOrEncounter(null, encounter, 'missing-uuid')
    ).toBeNull();
  });

  it('should return true if value is empty, null or undefined', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);
    let val = '';

    expect(helper.isEmpty(val)).toBe(true);

    val = 'test';
    expect(helper.isEmpty(val)).toBe(false);
  });

  it('should return true if array contains items', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

    const arr = [1, 2, 3, 4];

    let members = [1, 4];

    let result = helper.arrayContains(arr, members);
    expect(result).toBe(true);

    members = [4, 7, 8, 9, 0, 6];
    result = helper.arrayContains(arr, members);
    expect(result).toBe(false);
  });

  it('should return true if array contains atleast one item', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

    const arr = [1, 2, 3, 4];

    let members = [1, 4, 7, 8, 9, 0, 6];

    let result = helper.arrayContainsAny(arr, members);
    expect(result).toBe(true);

    members = [7, 8, 9, 0, 6];
    result = helper.arrayContainsAny(arr, members);
    expect(result).toBe(false);
  });
  it('should return true if a value does not match a regular expression', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

    let val = 'REC12345-123';
    let regexString = '^REC\\d{5}-\\d{5,6}$';

    expect(helper.doesNotMatchExpression(regexString, val)).toBe(true);

    val = 'REC12345-12345';
    expect(helper.doesNotMatchExpression(regexString, val)).toBe(false);
  });
  it('should return the gravida value given term births and abortion count', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

    let parityTerm = 0;
    let parityAbortion = 0;

    expect(helper.calcGravida(parityTerm, parityAbortion)).toBe(1);

    parityTerm = 1;
    parityAbortion = 2;
    expect(helper.calcGravida(parityTerm, parityAbortion)).toBe(4);
  });

  it('should format dates using the provided format and offset', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

    const value = '2016-01-22T16:17:46.000+0300';
    expect(helper.formatDate(value, 'yyyy-MM-dd', '+0300')).toBe('2016-01-22');
    expect(helper.formatDate(value, 'yyyy-MM-dd HH:mm', '+0300')).toBe(
      '2016-01-22 16:17'
    );
  });

  it('should throw when formatting an invalid date', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);
    expect(() =>
      helper.formatDate('not-a-date', 'yyyy-MM-dd', '+0300')
    ).toThrow();
  });

  it('should expose calcBSA and formatDate to runnable expressions', () => {
    const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);
    const runner: ExpressionRunner = TestBed.inject(ExpressionRunner);

    const control = new AfeFormControl();
    control.uuid = 'a';
    const height = new AfeFormControl();
    height.uuid = 'height';
    height.setValue(190.5);
    const weight = new AfeFormControl();
    weight.uuid = 'weight';
    weight.setValue(95);

    control.controlRelations.addRelatedControls(height);
    control.controlRelations.addRelatedControls(weight);

    let runnable: Runnable = runner.getRunnable(
      'calcBSA(height, weight)',
      control,
      helper.helperFunctions,
      {}
    );
    expect(runnable.run()).toBe(2.24);

    runnable = runner.getRunnable(
      `formatDate('2016-01-22T16:17:46.000+0300', 'yyyy-MM-dd', '+0300')`,
      control,
      helper.helperFunctions,
      {}
    );
    expect(runnable.run()).toBe('2016-01-22');
  });

  describe('calcWeightForHeightZscore', () => {
    const mockWeightForHeightRef = [
      {
        Length: 45,
        SD4neg: 1.71,
        SD3neg: 1.877,
        SD2neg: 2.043,
        SD1neg: 2.23,
        SD0: 2.441,
        SD1: 2.68,
        SD2: 2.951,
        SD3: 3.261,
        SD4: 3.571
      },
      {
        Length: 80,
        SD4neg: 8.5,
        SD3neg: 9.3,
        SD2neg: 10.2,
        SD1neg: 11.2,
        SD0: 12.3,
        SD1: 13.6,
        SD2: 15.1,
        SD3: 16.8,
        SD4: 18.7
      }
    ];

    it('should return the correct z-score when height and weight are within range', () => {
      const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 45, 2.5)
      ).toBe('0');
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 80, 14)
      ).toBe('1');
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 60, 14)
      ).toBeNull();
    });

    it('should return null when height is outside the reference table (below 45 cm or above 110 cm)', () => {
      const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

      // Below 45 cm
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 44.9, 2)
      ).toBeNull();
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 44.96, 2)
      ).toBeNull();
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 30, 2)
      ).toBeNull();

      // Above 110 cm
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 110.04, 20)
      ).toBeNull();
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 110.1, 20)
      ).toBeNull();
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 112, 20)
      ).toBeNull();
    });

    it('should return null when weightForHeightRef is null, undefined, or empty', () => {
      const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

      expect(helper.calcWeightForHeightZscore(null, 80, 14)).toBeNull();
      expect(helper.calcWeightForHeightZscore(undefined, 80, 14)).toBeNull();
      expect(helper.calcWeightForHeightZscore([], 80, 14)).toBeNull();
    });

    it('should return null when height or weight is missing or zero', () => {
      const helper: JsExpressionHelper = TestBed.inject(JsExpressionHelper);

      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, null, 14)
      ).toBeNull();
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 80, null)
      ).toBeNull();
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 0, 14)
      ).toBeNull();
      expect(
        helper.calcWeightForHeightZscore(mockWeightForHeightRef, 80, 0)
      ).toBeNull();
    });
  });
});
