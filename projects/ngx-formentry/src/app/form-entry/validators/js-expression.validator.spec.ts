import { TestBed } from '@angular/core/testing';

import { AfeFormControl } from '../../abstract-controls-extension/control-extensions';
import { JsExpressionValidator } from './js-expression.validator';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { Validations } from './validations';

describe('JS Expression Validator:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                JsExpressionValidator,
                JsExpressionHelper,
                ExpressionRunner
            ]
        });
    });

    it('should be defined', () => {
        let validator: JsExpressionValidator = TestBed.get(JsExpressionValidator);
        expect(validator).toBeTruthy();
    });

    it('should validate a given expression', () => {

      Validations.JSExpressionValidatorsEnabled = true;
      let validator: JsExpressionValidator = TestBed.get(JsExpressionValidator);
      let model = new JsExpressionValidationModel({
        type: 'js_expression',
        message: 'test message',
        failsWhenExpression: 'isEmpty(b)'
      });

      let control = new AfeFormControl();
      control.uuid = 'a';
      let control2 = new AfeFormControl();
      control2.uuid = 'b';
      control2.setValue(null);
      let control3 = new AfeFormControl();
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
      let validator: JsExpressionValidator = TestBed.get(JsExpressionValidator);
      let model = new JsExpressionValidationModel({
        type: 'js_expression',
        message: 'test message',
        failsWhenExpression: 'isEmpty(a) && isEmpty(b)'
      });

      let control = new AfeFormControl();
      control.uuid = 'a';
      control.setValue('test');
      let control2 = new AfeFormControl();
      control2.uuid = 'b';
      control2.setValue('20');
      let control3 = new AfeFormControl();
      control3.uuid = 'c';
      control3.setValue(30);

      control.controlRelations.addRelatedControls(control2);
      control.controlRelations.addRelatedControls(control3);

      let result = validator.validate(model)(control);

      expect(result).toBe(null);
    });
  });
