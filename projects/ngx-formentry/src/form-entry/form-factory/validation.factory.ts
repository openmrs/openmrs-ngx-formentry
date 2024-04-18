import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
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
import { ValidationModel } from '../question-models/validation.model';
import { DateValidationModel } from '../question-models/date-validation.model';
import { MaxValidationModel } from '../question-models/max-validation.model';
import { MinValidationModel } from '../question-models/min-validation.model';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { MaxLengthValidator } from '../validators/max-length.validator';
import { MaxLengthValidationModel } from '../question-models/max-length-validation.model';
import { MinLengthValidationModel } from '../question-models/min-length-validation.model';
import { MinLengthValidator } from '../validators/min-length.validator';
import { DisallowDecimalsValidator } from '../validators/disallow-decimals.validator';

@Injectable()
export class ValidationFactory {
  constructor(private translate: TranslateService) {}

  getValidators(question: QuestionBase, form?: any) {
    const list: Array<any> = [];

    if (question.validators) {
      _.forEach(question.validators, (validator: ValidationModel) => {
        switch (validator.type) {
          case 'date':
            list.push(this.dateValidator);
            const allowFutureDates: boolean = (<DateValidationModel>validator)
              .allowFutureDates;

            if (!allowFutureDates) {
              list.push(this.futureDateRestrictionValidator);
            }
            break;
          case 'js_expression':
            list.push(
              this.jsExpressionValidator.validate(
                <JsExpressionValidationModel>validator,
                form
              )
            );
            break;
          case 'max':
            list.push(
              this.getMaxValueValidator((<MaxValidationModel>validator).max)
            );
            break;
          case 'disallowDecimals':
            list.push(this.getDisallowedDecimalsValidator());
            break;
          case 'maxlength':
            list.push(
              this.maxLengthValidator(
                (<MaxLengthValidationModel>validator).maxlength
              )
            );
            break;
          case 'min':
            list.push(
              this.getMinValueValidator((<MinValidationModel>validator).min)
            );
            break;
          case 'minlength':
            list.push(
              this.minLengthValidator(
                (<MinLengthValidationModel>validator).minlength
              )
            );
            break;
          case 'conditionalRequired':
            list.push(
              this.conditionalRequiredValidator.validate(
                <ConditionalValidationModel>validator
              )
            );
            break;
          case 'conditionalAnswered':
            list.push(
              this.conditionalAnsweredValidator.validate(
                <ConditionalValidationModel>validator
              )
            );
            break;
        }
      });
    }

    if (
      question.required &&
      typeof question.required === 'string' &&
      question.required === 'true'
    ) {
      list.push(this.requiredValidator);
    } else {
      // TODO - handle custom required validator
    }

    return list;
  }

  get conditionalRequiredValidator(): ConditionalRequiredValidator {
    return new ConditionalRequiredValidator();
  }

  get conditionalAnsweredValidator(): ConditionalAnsweredValidator {
    return new ConditionalAnsweredValidator();
  }

  get disallowDecimalsValidator(): DisallowDecimalsValidator {
    return new DisallowDecimalsValidator();
  }

  get requiredValidator(): any {
    return new RequiredValidator().validate;
  }

  get dateValidator(): any {
    return new DateValidator().validate;
  }

  get futureDateRestrictionValidator(): any {
    return new FutureDateRestrictionValidator().validate;
  }

  get maxDateValidator(): any {
    return new MaxDateValidator().validate;
  }

  get minDateValidator(): any {
    return new MinDateValidator().validate;
  }

  public minLengthValidator(minLength: number) {
    return new MinLengthValidator().validate(minLength);
  }

  public maxLengthValidator(maxLength: number) {
    return new MaxLengthValidator().validate(maxLength);
  }

  public getMinValueValidator(min: number): any {
    return new MinValidator().validate(min);
  }

  public getMaxValueValidator(max: number): any {
    return new MaxValidator().validate(max);
  }

  public getDisallowedDecimalsValidator() {
    return new DisallowDecimalsValidator().validate();
  }

  get jsExpressionValidator() {
    return new JsExpressionValidator();
  }

  public errors(errors: any, question: QuestionBase): Array<string> {
    const messages: Array<string> = [];

    for (const property in errors) {
      if (errors.hasOwnProperty(property)) {
        switch (property) {
          case 'required':
            messages.push(this.translate.instant('requiredField'));
            break;
          case 'date':
            messages.push(this.translate.instant('invalidDate'));
            break;
          case 'futureDateRestriction':
            messages.push(this.translate.instant('futureDateRestriction'));
            break;
          case 'disallowDecimals':
            messages.push(this.translate.instant('disallowDecimals'));
            break;
          case 'minlength':
            messages.push(
              this.translate
                .instant('minLength')
                .replace('{minLength}', errors.minlength.requiredLength)
            );
            break;
          case 'maxlength':
            messages.push(
              this.translate
                .instant('maxLength')
                .replace('{maxLength}', errors.maxlength.requiredLength)
            );
            break;
          case 'maxdate':
            messages.push(
              this.translate
                .instant('maxDate')
                .replace('{maxDate}', errors.maxdate.requiredDate)
            );
            break;
          case 'mindate':
            messages.push(
              this.translate
                .instant('minDate')
                .replace('{minDate}', errors.mindate.requiredDate)
            );
            break;
          case 'max':
            messages.push(
              this.translate
                .instant('max')
                .replace('{max}', errors.max.requiredValue)
            );
            break;
          case 'min':
            messages.push(
              this.translate
                .instant('min')
                .replace('{min}', errors.min.requiredValue)
            );
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
