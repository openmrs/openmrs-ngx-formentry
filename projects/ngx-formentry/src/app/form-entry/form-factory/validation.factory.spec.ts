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
