import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

import { ValidationFactory } from './validation.factory';
import { QuestionFactory } from './question.factory';
import { Messages } from '../utils/messages';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
describe('ValidationFactory Unit Tests', () => {
  const translateServiceMock = jasmine.createSpyObj('TranslateService', [
    'instant'
  ]);
  translateServiceMock.instant.and.returnValue('Invalid value');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({})],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock
        }
      ]
    }).compileComponents();
  });

  const dateSchemaQuestion: any = {
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

  const numberSchemaQuestion: any = {
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

  const questionFactory = new QuestionFactory();
  const validationFactory = new ValidationFactory(translateServiceMock);

  it('should return validators when a question model is provided', () => {
    const converted = questionFactory.toDateQuestion(dateSchemaQuestion);
    const validations = validationFactory.getValidators(converted);
    expect(validations.length).toBeGreaterThan(0);
  });

  it('should return the correct date error message when date is invalid', () => {
    translateServiceMock.instant.and.returnValue(Messages.invalidDate);
    const date = 'fake date';
    const converted = questionFactory.toDateQuestion(dateSchemaQuestion);
    const validations = validationFactory.getValidators(converted);

    const formControl = new AfeFormControl(date, validations);

    const errorMessages = validationFactory.errors(
      formControl.errors,
      converted
    );

    expect(errorMessages.indexOf(Messages.invalidDate)).not.toBe(-1);
    expect(formControl.errors['date']).toBe(true);
  });

  it('should return the correct error message when min value is invalid', () => {
    translateServiceMock.instant.and.returnValue(Messages.min);
    const value: any = -50;
    const converted = questionFactory.toNumberQuestion(numberSchemaQuestion);
    const validations = validationFactory.getValidators(converted);

    const formControl = new AfeFormControl(value, validations);

    const errorMessages = validationFactory.errors(
      formControl.errors,
      converted
    );
    expect(errorMessages.length).not.toBe(0);
    const expectedMsg = Messages.min.replace(
      '{min}',
      numberSchemaQuestion.questionOptions.min
    );
    expect(errorMessages.indexOf(expectedMsg)).not.toBe(-1);
  });

  it('should return the correct error message when max value is invalid', () => {
    translateServiceMock.instant.and.returnValue(Messages.max);
    const value: any = 450;
    const converted = questionFactory.toNumberQuestion(numberSchemaQuestion);
    const validations = validationFactory.getValidators(converted);

    const formControl = new AfeFormControl(value, validations);

    const errorMessages = validationFactory.errors(
      formControl.errors,
      converted
    );
    expect(errorMessages.length).not.toBe(0);
    const expectedMsg = Messages.max.replace(
      '{max}',
      numberSchemaQuestion.questionOptions.max
    );
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
