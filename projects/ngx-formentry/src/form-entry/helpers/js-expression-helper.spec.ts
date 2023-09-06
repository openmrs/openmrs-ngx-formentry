import { TestBed } from '@angular/core/testing';

import { JsExpressionHelper } from './js-expression-helper';

describe('JS Expression Helper Service:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsExpressionHelper]
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
});
