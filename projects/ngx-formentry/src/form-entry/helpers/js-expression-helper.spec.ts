import { TestBed } from '@angular/core/testing';

import { JsExpressionHelper } from './js-expression-helper';

describe('JS Expression Helper Service:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsExpressionHelper]
    });
  });

  it('should be defined', () => {
    const helper: JsExpressionHelper = TestBed.get(JsExpressionHelper);
    expect(helper).toBeTruthy();
  });

  it('should return the correct bmi when height and weight are provided', () => {
    const helper: JsExpressionHelper = TestBed.get(JsExpressionHelper);

    const height = 180; // cm
    const weight = 70; // kgs

    const bmi = helper.calcBMI(height, weight);
    expect(bmi).toBe(21.6);
  });

  it('should return true if value is empty, null or undefined', () => {
    const helper: JsExpressionHelper = TestBed.get(JsExpressionHelper);
    let val = '';

    expect(helper.isEmpty(val)).toBe(true);

    val = 'test';
    expect(helper.isEmpty(val)).toBe(false);
  });

  it('should return true if array contains items', () => {
    const helper: JsExpressionHelper = TestBed.get(JsExpressionHelper);

    const arr = [1, 2, 3, 4];

    let members = [1, 4];

    let result = helper.arrayContains(arr, members);
    expect(result).toBe(true);

    members = [4, 7, 8, 9, 0, 6];
    result = helper.arrayContains(arr, members);
    expect(result).toBe(false);
  });

  it('should return true if array contains atleast one item', () => {
    const helper: JsExpressionHelper = TestBed.get(JsExpressionHelper);

    const arr = [1, 2, 3, 4];

    let members = [1, 4, 7, 8, 9, 0, 6];

    let result = helper.arrayContainsAny(arr, members);
    expect(result).toBe(true);

    members = [7, 8, 9, 0, 6];
    result = helper.arrayContainsAny(arr, members);
    expect(result).toBe(false);
  });
});
