import { TestBed } from '@angular/core/testing';

import { AfeFormControl } from '../../abstract-controls-extension';
import { ConditionalAnsweredValidator } from './conditional-answered.validator';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';

describe('Conditional Answered Validator:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConditionalAnsweredValidator]
    });
  });

  it('should be defined', () => {
    const validator: ConditionalAnsweredValidator = TestBed.get(
      ConditionalAnsweredValidator
    );
    expect(validator).toBeTruthy();
  });

  it('should return an error when control is invalid', () => {
    const validator: ConditionalAnsweredValidator = TestBed.get(
      ConditionalAnsweredValidator
    );
    const model = new ConditionalValidationModel({
      type: 'conditionalAnswered',
      message: 'test message',
      referenceQuestionId: 'control2',
      referenceQuestionAnswers: ['a']
    });

    const control = new AfeFormControl();
    control.uuid = 'control1';
    control.setValue('b');
    const control2 = new AfeFormControl();
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
    const validator: ConditionalAnsweredValidator = TestBed.get(
      ConditionalAnsweredValidator
    );
    const model = new ConditionalValidationModel({
      type: 'conditionalAnswered',
      message: 'test message',
      referenceQuestionId: 'control2',
      referenceQuestionAnswers: ['a']
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

    let result = validator.validate(model)(control);
    expect(result).toBe(null);

    control.setValue(null);
    control2.setValue(null);
    result = validator.validate(model)(control);
    expect(result).toBe(null);
  });
});
