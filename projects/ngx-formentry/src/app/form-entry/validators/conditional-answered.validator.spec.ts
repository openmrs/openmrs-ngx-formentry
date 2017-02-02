import { TestBed } from '@angular/core/testing';

import { AfeFormControl } from '../../abstract-controls-extension/control-extensions';
import { ConditionalAnsweredValidator } from './conditional-answered.validator';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';

describe('Conditional Answered Validator:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConditionalAnsweredValidator
            ]
        });
    });

    it('should be defined', () => {
        let validator: ConditionalAnsweredValidator = TestBed.get(ConditionalAnsweredValidator);
        expect(validator).toBeTruthy();
    });

    it('should return an error when control is invalid', () => {

      let validator: ConditionalAnsweredValidator = TestBed.get(ConditionalAnsweredValidator);
      let model = new ConditionalValidationModel({
        type: 'conditionalAnswered',
        message: 'test message',
        referenceQuestionId: 'control2',
        referenceQuestionAnswers: ['a']
      });

      let control = new AfeFormControl();
      control.uuid = 'control1';
      control.setValue('b');
      let control2 = new AfeFormControl();
      control2.uuid = 'control2';
      control2.setValue('');

      control.controlRelations.addRelatedControls(control2);

      let result = validator.validate(model)(control);
      expect(result['conditional_answered']).toBeTruthy();

      control2.setValue('b');
      control.setValue('new val');

      result = validator.validate(model)(control);
      expect(result['conditional_answered']).toBeTruthy();
    });

    it('should return null when control is valid', () => {

      let validator: ConditionalAnsweredValidator = TestBed.get(ConditionalAnsweredValidator);
      let model = new ConditionalValidationModel({
        type: 'conditionalAnswered',
        message: 'test message',
        referenceQuestionId: 'control2',
        referenceQuestionAnswers: ['a']
      });

      let control = new AfeFormControl();
      control.uuid = 'control1';
      control.setValue('valid');
      let control2 = new AfeFormControl();
      control2.uuid = 'control2';
      control2.setValue(null);
      control2.setValue({
        value: 'a'
      });

      control.controlRelations.addRelatedControls(control2);

      let result = validator.validate(model)(control);
      expect(result).toBe(null);

      control.setValue(null);
      control2.setValue(null);
      result = validator.validate(model)(control);
      expect(result).toBe(null);

    });
  });
