import { Injectable } from '@angular/core';

import { Alert, AlertConfig } from '../control-alerts/can-generate-alert';

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

  getJsExpressionAlerts(
    question: QuestionBase,
    control: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form
  ): Alert[] {
    const tewsAlert = this.tewsAlertFactory.buildAlert(question, control);
    if (tewsAlert) {
      return [tewsAlert];
    }

    const conceptRangeAlert = this.conceptRangeAlertFactory.buildAlert(
      question,
      control,
      form
    );
    if (conceptRangeAlert) {
      return [conceptRangeAlert];
    }

    const alertConfigs = this.normalizeAlertConfigs(question.alert);
    return alertConfigs.map((alertConfig) =>
      this.createAlert(alertConfig, control, form)
    );
  }

  /** @deprecated Use {@link getJsExpressionAlerts} instead. */
  getJsExpressionshowAlert(
    question: QuestionBase,
    control: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form
  ): Alert {
    return this.getJsExpressionAlerts(question, control, form)[0];
  }

  private normalizeAlertConfigs(
    alert: AlertConfig | AlertConfig[] | null | undefined
  ): AlertConfig[] {
    if (!alert) {
      return [];
    }
    return Array.isArray(alert) ? alert : [alert];
  }

  private createAlert(
    alertConfig: AlertConfig,
    control: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form
  ): Alert {
    const runnable: Runnable = this.expressionRunner.getRunnable(
      alertConfig.alertWhenExpression,
      control,
      this.expressionHelper.helperFunctions,
      {},
      form
    );
    const jsAlert: Alert = {
      shown: false,
      alertWhenExpression: alertConfig.alertWhenExpression,
      message: alertConfig.message,
      reEvaluateAlertExpression: () => {
        const result = runnable.run();
        jsAlert.shown = result;
      }
    };
    return jsAlert;
  }
}
