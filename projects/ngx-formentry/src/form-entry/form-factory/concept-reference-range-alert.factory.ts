import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Alert } from '../control-alerts/can-generate-alert';
import {
  AfeFormArray,
  AfeFormControl,
  AfeFormGroup
} from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { Form } from './form';
import {
  ConceptReferenceRangeItem,
  ConceptReferenceRangeService
} from '../services/concept-reference-range.service';

@Injectable({ providedIn: 'root' })
export class ConceptReferenceRangeAlertFactory {
  constructor(
    private conceptRangeService: ConceptReferenceRangeService,
    private sanitizer: DomSanitizer
  ) {}

  buildAlert(
    question: QuestionBase,
    control: AfeFormControl | AfeFormArray | AfeFormGroup,
    form?: Form
  ): Alert | null {
    if (
      question?.alert?.useConceptReferenceRange !== true ||
      !question?.extras?.questionOptions?.concept
    ) {
      return null;
    }

    const conceptUuid = question.extras.questionOptions.concept;
    let range: ConceptReferenceRangeItem | null = null;
    let fetching = false;

    const alert: Alert = {
      shown: false,
      alertWhenExpression: 'conceptReferenceRange',
      message: '',
      reEvaluateAlertExpression: () => {
        const patientUuid = form?.valueProcessingInfo?.patientUuid;
        const value = this.parseNumericValue((control as any)?.value);

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
          alert.message = '';
          return;
        }

        const evaluated = this.evaluateConceptRangeAlert(range, value);
        alert.shown = evaluated.shown;
        alert.message = (evaluated.message as any) || '';
      }
    };

    return alert;
  }

  private parseNumericValue(rawValue: unknown): number {
    return typeof rawValue === 'number'
      ? rawValue
      : parseFloat(rawValue as any);
  }

  private shouldFetchRange(
    currentRange: ConceptReferenceRangeItem | null,
    patientUuid?: string,
    fetching?: boolean
  ): boolean {
    return !currentRange && !!patientUuid && !fetching;
  }

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

  private buildUnits(range: ConceptReferenceRangeItem): string {
    return range.units ? ` ${range.units}` : '';
  }

  private buildNormalRangeText(
    range: ConceptReferenceRangeItem,
    units: string
  ): string {
    return `(${range.lowNormal} - ${range.hiNormal}) ${units}`;
  }

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

  private evaluateConceptRangeAlert(
    range: ConceptReferenceRangeItem,
    value: number
  ): { shown: boolean; message: SafeHtml | null } {
    const units = this.buildUnits(range);
    const normalRange = this.buildNormalRangeText(range, units);
    const valueText = `${value}${units}`;

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
}
