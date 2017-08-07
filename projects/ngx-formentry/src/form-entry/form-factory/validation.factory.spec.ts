import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

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
            }
        ]
    };

    let numberSchemaQuestion: any = {
      label: 'Height(CM):',
      id: 'height',
      questionOptions: {
        rendering: 'number',
        concept: 'a8a6619c-1350-11df-a1f1-0026b9348838',
        max: '350',
        min: '0'
      },
      type: 'obs',
      validators: []
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

        let formControl = new AfeFormControl(date, validations);

        let errorMessages = validationFactory.errors(formControl.errors, converted);

        expect(errorMessages.indexOf(Messages.INVALID_DATE_MSG)).not.toBe(-1);
        expect(formControl.errors['date']).toBe(true);
    });

    it('should return the correct error message when min value is invalid', () => {

       let value: any = -50;
      let converted = questionFactory.toNumberQuestion(numberSchemaQuestion);
      let validations = validationFactory.getValidators(converted);

      let formControl = new AfeFormControl(value, validations);

      let errorMessages = validationFactory.errors(formControl.errors, converted);
      expect(errorMessages.length).not.toBe(0);
      let expectedMsg = Messages.MIN_MSG.replace('{min}', numberSchemaQuestion.questionOptions.min);
      expect(errorMessages.indexOf(expectedMsg)).not.toBe(-1);
    });

    it('should return the correct error message when max value is invalid', () => {

       let value: any = 450;
      let converted = questionFactory.toNumberQuestion(numberSchemaQuestion);
      let validations = validationFactory.getValidators(converted);

      let formControl = new AfeFormControl(value, validations);

      let errorMessages = validationFactory.errors(formControl.errors, converted);
      expect(errorMessages.length).not.toBe(0);
      let expectedMsg = Messages.MAX_MSG.replace('{max}', numberSchemaQuestion.questionOptions.max);
      expect(errorMessages.indexOf(expectedMsg)).not.toBe(-1);
    });

    it('should have validator functions', () => {

        expect(validationFactory.requiredValidator).toBeDefined();
        expect(validationFactory.dateValidator).toBeDefined();
        expect(validationFactory.futureDateRestrictionValidator).toBeDefined();
        expect(validationFactory.maxDateValidator).toBeDefined();
        expect(validationFactory.minDateValidator).toBeDefined();
        expect(validationFactory.minLengthValidator).toBeDefined();
        expect(validationFactory.maxLengthValidator).toBeDefined();
        expect(validationFactory.getMinValueValidator).toBeDefined();
        expect(validationFactory.getMaxValueValidator).toBeDefined();
    });
});
