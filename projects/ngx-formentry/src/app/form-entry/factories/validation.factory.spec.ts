import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { ValidationFactory } from './validation.factory';
import { QuestionFactory } from './question.factory';
import { Messages } from '../utils/messages';

describe('ValidationFactory Unit Tests', () => {

  let dateSchemaQuestion: any = {
      label: 'Date patient first became medically eligible for ART:',
      id: 'eligibility',
      type: 'obs',
      questionOptions: {
          concept: '81608e3b-fece-4136-8def-b822b54de197',
          rendering: 'date'
      },
      validators: [
          {
              type: 'date',
              allowFutureDates: 'false'
          },
          {
              type: 'js_expression',
              failsWhenExpression: '(new moment(encDate)).isBefore((new moment(myValue)), "day") || (new moment(encDate)).isSame((new moment(myValue)), "day")',
              message: 'Date should be before the encounter date.'
          }
      ]
  };

  let questionFactory = new QuestionFactory();
  let validationFactory = new ValidationFactory();

  it('should return validators when a question model is provided', () => {

    let converted = questionFactory.toDateQuestion(dateSchemaQuestion);
    let validations = validationFactory.getValidators(converted);
    expect(validations.length).toBeGreaterThan(0);
  });

  it('should return the correct date error message when date is invalid', () => {

    let date = 'fake date';
    let converted = questionFactory.toDateQuestion(dateSchemaQuestion);
    let validations = validationFactory.getValidators(converted);

    let formControl = new FormControl(date, validations);

    let errorMessages = validationFactory.errors(formControl.errors, converted);

    expect(errorMessages.indexOf(Messages.INVALID_DATE_MSG)).not.toBe(-1);
    expect(formControl.errors.date).toBe(true);
  });

  it('should have validator functions', () => {

    expect(validationFactory.requiredValidator).toBeDefined();
    expect(validationFactory.dateValidator).toBeDefined();
    expect(validationFactory.futureDateRestrictionValidator).toBeDefined();
    expect(validationFactory.maxDateValidator).toBeDefined();
    expect(validationFactory.minDateValidator).toBeDefined();
    expect(validationFactory.minLengthValidator).toBeDefined();
    expect(validationFactory.maxLengthValidator).toBeDefined();
    expect(validationFactory.minValueValidator).toBeDefined();
    expect(validationFactory.maxValueValidator).toBeDefined();
  });
});
