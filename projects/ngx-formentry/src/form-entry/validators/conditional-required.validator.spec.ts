import { TestBed } from '@angular/core/testing';

import { AfeFormControl } from '../../abstract-controls-extension';
import { ConditionalRequiredValidator } from './conditional-required.validator';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';

describe('Conditional Required Validator:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConditionalRequiredValidator]
    });
  });

  it('should be defined', () => {
    const validator: ConditionalRequiredValidator = TestBed.get(
      ConditionalRequiredValidator
    );
    expect(validator).toBeTruthy();
  });

  it('should return an error when control is invalid', () => {
    const validator: ConditionalRequiredValidator = TestBed.get(
      ConditionalRequiredValidator
    );
    const model = new ConditionalValidationModel({
      type: 'conditionalRequired',
      message: 'test message',
      referenceQuestionId: 'control2',
      referenceQuestionAnswers: ['a', 'd']
    });

    const control = new AfeFormControl();
    control.uuid = 'control1';
    const control2 = new AfeFormControl();
    control2.uuid = 'control2';
    control2.setValue(null);
    control2.setValue({
      value: 'a'
    });

    control.controlRelations.addRelatedControls(control2);

    const result = validator.validate(model)(control);
    expect(result['conditional_required']).toBeTruthy();
  });

  it('should return null when control is valid', () => {
    const validator: ConditionalRequiredValidator = TestBed.get(
      ConditionalRequiredValidator
    );
    const model = new ConditionalValidationModel({
      type: 'conditionalRequired',
      message: 'test message',
      referenceQuestionId: 'control2',
      referenceQuestionAnswers: ['a', 'd']
    });

    const control = new AfeFormControl();
    control.uuid = 'control1';
    control.setValue('valid');
    const control2 = new AfeFormControl();
    control2.uuid = 'control2';
    control2.setValue(null);
    control2.setValue({
      value: 'a'
    });

    control.controlRelations.addRelatedControls(control2);

    const result = validator.validate(model)(control);
    expect(result).toBe(null);
  });
});
