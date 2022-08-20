import { TestBed } from '@angular/core/testing';

import { AfeFormControl } from '../../abstract-controls-extension';
import { JsExpressionValidator } from './js-expression.validator';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { Validations } from './validations';

describe('JS Expression Validator:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsExpressionValidator, JsExpressionHelper, ExpressionRunner]
    });
  });

  it('should be defined', () => {
    const validator: JsExpressionValidator = TestBed.inject(
      JsExpressionValidator
    );
    expect(validator).toBeTruthy();
  });

  it('should validate a given expression', () => {
    Validations.JSExpressionValidatorsEnabled = true;
    const validator: JsExpressionValidator = TestBed.inject(
      JsExpressionValidator
    );
    const model = new JsExpressionValidationModel({
      type: 'js_expression',
      message: 'test message',
      failsWhenExpression: 'isEmpty(b)'
    });

    const control = new AfeFormControl();
    control.uuid = 'a';
    const control2 = new AfeFormControl();
    control2.uuid = 'b';
    control2.setValue(null);
    const control3 = new AfeFormControl();
    control3.uuid = 'c';
    control3.setValue(30);

    control.controlRelations.addRelatedControls(control2);
    control.controlRelations.addRelatedControls(control3);

    let result = validator.validate(model)(control);
    expect(result['js_expression']).toBeTruthy();

    control2.setValue('test');
    result = validator.validate(model)(control);
    expect(result).toBe(null);
  });

  it('should return null when validation passes', () => {
    Validations.JSExpressionValidatorsEnabled = true;
    const validator: JsExpressionValidator = TestBed.inject(
      JsExpressionValidator
    );
    const model = new JsExpressionValidationModel({
      type: 'js_expression',
      message: 'test message',
      failsWhenExpression: 'isEmpty(a) && isEmpty(b)'
    });

    const control = new AfeFormControl();
    control.uuid = 'a';
    control.setValue('test');
    const control2 = new AfeFormControl();
    control2.uuid = 'b';
    control2.setValue('20');
    const control3 = new AfeFormControl();
    control3.uuid = 'c';
    control3.setValue(30);

    control.controlRelations.addRelatedControls(control2);
    control.controlRelations.addRelatedControls(control3);

    const result = validator.validate(model)(control);

    expect(result).toBe(null);
  });
});
