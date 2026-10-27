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
import {
  ConceptReferenceRangeAlert,
  evaluateConceptReferenceRange
} from '../control-alerts/concept-reference-range-alert';

@Injectable()
export class AlertsFactory {
  constructor(
    private expressionRunner: ExpressionRunner,
    private expressionHelper: JsExpressionHelper
  ) {}

  getConceptReferenceRangeAlert(
    control: AfeFormControl
  ): ConceptReferenceRangeAlert {
    const alert: ConceptReferenceRangeAlert = {
      source: 'conceptReferenceRange',
      severity: 'warning',
      shown: false,
      alertWhenExpression: '',
      alertMessage: '',
      reEvaluateAlertExpression: () => {
        const warning =
          control.hidden || control.disabled
            ? null
            : evaluateConceptReferenceRange(
                control.value,
                control.conceptReferenceRange
              );
        alert.shown = warning !== null;
        alert.alertMessage = warning?.alertMessage ?? '';
        alert.severity = warning?.severity ?? 'warning';
        alert.limit = warning?.limit;
        alert.units = warning?.units ?? '';
      }
    };
    return alert;
  }

  getJsExpressionshowAlert(
    question: QuestionBase,
    control: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form
  ): Alert {
    const runnable: Runnable = this.expressionRunner.getRunnable(
      question.alert.alertWhenExpression,
      control,
      this.expressionHelper.helperFunctions,
      {},
      form
    );
    const showAlert: Alert = {
      shown: false,
      alertWhenExpression: question.alert.alertWhenExpression,
      alertMessage: question.alert.message,
      reEvaluateAlertExpression: () => {
        const result = runnable.run();
        showAlert.shown = result;
      }
    };
    return showAlert;
  }
}
