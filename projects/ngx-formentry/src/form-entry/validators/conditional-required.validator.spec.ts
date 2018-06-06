import { TestBed } from '@angular/core/testing';

import { AfeFormControl } from '../../abstract-controls-extension/control-extensions';
import { ConditionalRequiredValidator } from './conditional-required.validator';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';

describe('Conditional Required Validator:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConditionalRequiredValidator
            ]
        });
    });

    it('should be defined', () => {
        let validator: ConditionalRequiredValidator = TestBed.get(ConditionalRequiredValidator);
        expect(validator).toBeTruthy();
    });

    it('should return an error when control is invalid', () => {

      let validator: ConditionalRequiredValidator = TestBed.get(ConditionalRequiredValidator);
      let model = new ConditionalValidationModel({
        type: 'conditionalRequired',
        message: 'test message',
        referenceQuestionId: 'control2',
        referenceQuestionAnswers: ['a', 'd']
      });

      let control = new AfeFormControl();
      control.uuid = 'control1';
      let control2 = new AfeFormControl();
      control2.uuid = 'control2';
      control2.setValue(null);
      control2.setValue({
        value: 'a'
      });

      control.controlRelations.addRelatedControls(control2);

      let result = validator.validate(model)(control);
      expect(result['conditional_required']).toBeTruthy();
    });

    it('should return null when control is valid', () => {

      let validator: ConditionalRequiredValidator = TestBed.get(ConditionalRequiredValidator);
      let model = new ConditionalValidationModel({
        type: 'conditionalRequired',
        message: 'test message',
        referenceQuestionId: 'control2',
        referenceQuestionAnswers: ['a', 'd']
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
    });
  });
