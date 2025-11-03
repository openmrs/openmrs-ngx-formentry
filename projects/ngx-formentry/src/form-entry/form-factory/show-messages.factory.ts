import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  ConceptReferenceRangeItem,
  ConceptReferenceRangeService
} from '../services/concept-reference-range.service';

@Injectable()
export class AlertsFactory {
  constructor(
    private expressionRunner: ExpressionRunner,
    private expressionHelper: JsExpressionHelper,
    private conceptRangeService: ConceptReferenceRangeService,
    private sanitizer: DomSanitizer
  ) {}

  /**
   * Parse a raw control value into a number, handling both numeric and string inputs.
   * Returns NaN when value cannot be parsed.
   */
  private parseNumericValue(rawValue: unknown): number {
    return typeof rawValue === 'number'
      ? rawValue
      : parseFloat(rawValue as any);
  }

  /**
   * Whether we should lazily fetch the concept reference range.
   */
  private shouldFetchRange(
    currentRange: ConceptReferenceRangeItem | null,
    patientUuid?: string,
    fetching?: boolean
  ): boolean {
    return !currentRange && !!patientUuid && !fetching;
  }

  /**
   * Trigger lazy fetch for concept reference range then notify the control to re-evaluate.
   */
  private fetchConceptRange(
    patientUuid: string,
    conceptUuid: string,
    control: unknown,
    onFetched: (range: ConceptReferenceRangeItem | null) => void,
    onFinally?: () => void
  ): void {
    this.conceptRangeService
      .getReferenceRange(patientUuid, conceptUuid)
      .subscribe((r) => {
        onFetched(r);
        if (onFinally) {
          onFinally();
        }
        if ((control as any)?.updateAlert) {
          (control as any).updateAlert();
        }
      });
  }

  /**
   * Build units suffix string like " kg" if available, otherwise empty string.
   */
  private buildUnits(range: ConceptReferenceRangeItem): string {
    return range.units ? ` ${range.units}` : '';
  }

  /**
   * Build a human-friendly normal range string e.g. "(3.5-5.5) mmol/L".
   */
  private buildNormalRangeText(
    range: ConceptReferenceRangeItem,
    units: string
  ): string {
    return `(${range.lowNormal} - ${range.hiNormal}) ${units}`;
  }

  /**
   * Create a sanitized HTML message for a given alert type and values.
   */
  private buildAlertMessage(
    type: 'critical-low' | 'critical-high' | 'low' | 'high',
    valueText: string,
    normalRangeText: string
  ): SafeHtml {
    const styles: Record<string, string> = {
      'critical-low': '#da1e28',
      'critical-high': '#da1e28',
      low: 'rgba(212, 169, 14, 0.88)',
      high: 'rgba(212, 169, 14, 0.88)'
    };
    const labels: Record<string, string> = {
      'critical-low': 'Critical low',
      'critical-high': 'Critical high',
      low: 'Low',
      high: 'High'
    };
    const color = styles[type];
    const label = labels[type];
    const html = `<span style="color: ${color}; font-weight: bold;">${label}: ${valueText}</span><br/><small><span style="color: #24a148; font-weight: bold;">Normal range: ${normalRangeText}</span></small>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
   * Evaluate the alert state based on a concept reference range and a numeric value.
   * Returns either a SafeHtml message when alert should be shown, or null otherwise.
   */
  private evaluateConceptRangeAlert(
    range: ConceptReferenceRangeItem,
    value: number
  ): { shown: boolean; message: SafeHtml | null } {
    const units = this.buildUnits(range);
    const normalRange = this.buildNormalRangeText(range, units);
    const valueText = `${value}${units}`;

    // Critical checks
    if (typeof range.lowCritical === 'number' && value <= range.lowCritical) {
      return {
        shown: true,
        message: this.buildAlertMessage('critical-low', valueText, normalRange)
      };
    }
    if (typeof range.hiCritical === 'number' && value >= range.hiCritical) {
      return {
        shown: true,
        message: this.buildAlertMessage('critical-high', valueText, normalRange)
      };
    }

    // Outside normal range
    if (typeof range.lowNormal === 'number' && value < range.lowNormal) {
      return {
        shown: true,
        message: this.buildAlertMessage('low', valueText, normalRange)
      };
    }
    if (typeof range.hiNormal === 'number' && value > range.hiNormal) {
      return {
        shown: true,
        message: this.buildAlertMessage('high', valueText, normalRange)
      };
    }

    return { shown: false, message: null };
  }
  getJsExpressionshowAlert(
    question: QuestionBase,
    control: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form
  ): Alert {
    // If enabled, use concept reference ranges to evaluate alerts (with lazy fetch)
    if (
      question?.alert?.useConceptReferenceRange === true &&
      question?.extras.questionOptions.concept
    ) {
      const conceptUuid = question.extras.questionOptions.concept;
      let range: ConceptReferenceRangeItem | null = null;
      let fetching = false;

      const alert: Alert = {
        shown: false,
        alertWhenExpression: 'conceptReferenceRange',
        alertMessage: '',
        reEvaluateAlertExpression: () => {
          const patientUuid = form?.valueProcessingInfo?.patientUuid;
          const rawVal = (control as any).value;
          const value = this.parseNumericValue(rawVal);
          console.log('value', value);
          if (this.shouldFetchRange(range, patientUuid, fetching)) {
            fetching = true;
            this.fetchConceptRange(
              patientUuid as string,
              conceptUuid,
              control,
              (r) => {
                range = r;
              },
              () => {
                fetching = false;
              }
            );
          }

          if (range == null || isNaN(value)) {
            alert.shown = false;
            alert.alertMessage = '';
            return;
          }

          const evaluated = this.evaluateConceptRangeAlert(range, value);
          alert.shown = evaluated.shown;
          alert.alertMessage = (evaluated.message as any) || '';
        }
      };

      return alert;
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
