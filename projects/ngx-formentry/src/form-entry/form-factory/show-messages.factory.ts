import { Injectable } from '@angular/core';

import { Alert } from '../control-alerts/can-generate-alert';

import {
  ExpressionRunner,
  Runnable
} from '../expression-runner/expression-runner';
import {
  AfeFormControl,
  AfeFormArray,
  AfeFormGroup
} from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Form } from './form';
import { ConceptReferenceRangeAlertFactory } from './concept-reference-range-alert.factory';
import { TewsAlertFactory } from './tews-alert.factory';

@Injectable()
export class AlertsFactory {
  constructor(
    private expressionRunner: ExpressionRunner,
    private expressionHelper: JsExpressionHelper,
    private conceptRangeAlertFactory: ConceptReferenceRangeAlertFactory,
    private tewsAlertFactory: TewsAlertFactory
  ) {}
  getJsExpressionshowAlert(
    question: QuestionBase,
    control: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form
  ): Alert {
    const tewsAlert = this.tewsAlertFactory.buildAlert(question, control);
    if (tewsAlert) {
      return tewsAlert;
    }

    const conceptRangeAlert = this.conceptRangeAlertFactory.buildAlert(
      question,
      control,
      form
    );
    if (conceptRangeAlert) {
      return conceptRangeAlert;
    }

    const expr = question?.alert?.alertWhenExpression;
    const isValidExpr = typeof expr === 'string' && expr.trim().length > 0;

    if (!isValidExpr) {
      const noop: Alert = {
        shown: false,
        alertWhenExpression: '',
        alertMessage: '',
        reEvaluateAlertExpression: () => {
          noop.shown = false;
          noop.alertMessage = '';
        }
      };
      return noop;
    }

    const runnable: Runnable = this.expressionRunner.getRunnable(
      expr,
      control,
      this.expressionHelper.helperFunctions,
      {},
      form
    );
    const jsAlert: Alert = {
      shown: false,
      alertWhenExpression: expr,
      alertMessage: question.alert.message,
      reEvaluateAlertExpression: () => {
        const result = runnable.run();
        jsAlert.shown = result;
      }
    };
    return jsAlert;
  }
}
