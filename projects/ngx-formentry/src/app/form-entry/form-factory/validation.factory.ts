import {Injectable} from '@angular/core';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';

import { ConditionalRequiredValidator } from '../validators/conditional-required.validator';
import { ConditionalAnsweredValidator } from '../validators/conditional-answered.validator';
import { RequiredValidator } from '../validators/required.validator';
import { DateValidator } from '../validators/date.validator';
import { MinValidator } from '../validators/min.validator';
import { MaxValidator } from '../validators/max.validator';
import { MinDateValidator } from '../validators/min-date.validator';
import { MaxDateValidator } from '../validators/max-date.validator';
import { FutureDateRestrictionValidator } from '../validators/future-date-restriction.validator';
import { JsExpressionValidator } from '../validators/js-expression.validator';
import { QuestionBase } from '../question-models/question-base';
import { Messages } from '../utils/messages';
import { ValidationModel } from '../question-models/validation.model';
import { DateValidationModel } from '../question-models/date-validation.model';
import { MaxValidationModel} from '../question-models/max-validation.model';
import { MinValidationModel} from '../question-models/min-validation.model';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';

@Injectable()
export class ValidationFactory {

  constructor() {}

  getValidators(question: QuestionBase, form?: any) {

    let list: Array<any> = [];

    if (question.validators) {

      _.forEach(question.validators, (validator: ValidationModel) => {

        switch (validator.type) {
          case 'date':
            list.push(this.dateValidator);
            let allowFutureDates: boolean = ( <DateValidationModel>validator ).allowFutureDates;

            if (!allowFutureDates) {
              list.push(this.futureDateRestrictionValidator);
            }
            break;
          case 'js_expression':
            list.push(this.jsExpressionValidator.validate(<JsExpressionValidationModel>validator, form));
            break;
          case 'max':
            list.push(this.getMaxValueValidator((<MaxValidationModel>validator).max));
            break;
          case 'min':
            list.push(this.getMinValueValidator((<MinValidationModel>validator).min));
            break;
          case 'conditionalRequired':
            list.push(this.conditionalRequiredValidator.validate(<ConditionalValidationModel>validator));
            break;
          case 'conditionalAnswered':
            list.push(this.conditionalAnsweredValidator.validate(<ConditionalValidationModel>validator));
            break;
        }
      });
    }

    if (question.required && typeof(question.required) === 'string' && question.required === 'true') {
      list.push(this.requiredValidator);
    } else {

      // TODO - handle custom required validator
    }

    return list;
  }

  get conditionalRequiredValidator() {
    return new ConditionalRequiredValidator();
  }

  get conditionalAnsweredValidator() {
    return new ConditionalAnsweredValidator();
  }

  get requiredValidator() {
    return new RequiredValidator().validate;
  }

  get dateValidator() {
    return new DateValidator().validate;
  }

  get futureDateRestrictionValidator() {
    return new FutureDateRestrictionValidator().validate;
  }

  get maxDateValidator() {
    return new MaxDateValidator().validate;
  }

  get minDateValidator() {
    return new MinDateValidator().validate;
  }

  get minLengthValidator() {
    return Validators.minLength;
  }

  get maxLengthValidator() {
    return Validators.maxLength;
  }

  getMinValueValidator(min: number) {
    return new MinValidator().validate(min);
  }

  getMaxValueValidator(max: number) {

    return new MaxValidator().validate(max);
  }

  get jsExpressionValidator() {

    return new JsExpressionValidator();
  }

  errors(errors: any, question: QuestionBase): Array<string> {

    let messages: Array<string> = [];

    for (let property in errors) {
        if (errors.hasOwnProperty(property)) {

            switch (property) {
              case 'required':
                messages.push(Messages.REQUIRED_FIELD_MSG);
                break;
              case 'date':
                messages.push(Messages.INVALID_DATE_MSG);
                break;
              case 'futureDateRestriction':
                messages.push(Messages.FUTURE_DATE_RESTRICTION_MSG);
                break;
              case 'minlength':
                messages.push(Messages.MIN_LENGTH_MSG.replace('{minLength}', errors.minlength.requiredLength));
                break;
              case 'maxlength':
                messages.push(Messages.MIN_LENGTH_MSG.replace('{maxLength}', errors.maxlength.requiredLength));
                break;
              case 'maxdate':
                messages.push(Messages.MAX_DATE_MSG.replace('{maxDate}', errors.maxdate.requiredDate));
                break;
              case 'mindate':
                messages.push(Messages.MIN_DATE_MSG.replace('{minDate}', errors.mindate.requiredDate));
                break;
              case 'max':
                messages.push(Messages.MAX_MSG.replace('{max}', errors.max.requiredValue));
                break;
              case 'min':
                messages.push(Messages.MIN_MSG.replace('{min}', errors.min.requiredValue));
                break;
              case 'js_expression':
                messages.push(errors['js_expression'].message);
                break;
              case 'conditional_required':
                messages.push(errors['conditional_required'].message);
                break;
              case 'conditional_answered':
                messages.push(errors['conditional_answered'].message);
                break;
            }
        }
    }

    return messages;
  }
}
