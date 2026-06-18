import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Alert } from '../control-alerts/can-generate-alert';
import {
  AfeFormArray,
  AfeFormControl,
  AfeFormGroup
} from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';

@Injectable({ providedIn: 'root' })
export class TewsAlertFactory {
  constructor(private sanitizer: DomSanitizer) {}

  buildAlert(
    question: QuestionBase,
    control: AfeFormControl | AfeFormArray | AfeFormGroup
  ): Alert | null {
    if (question?.alert?.useTewsRange !== true) {
      return null;
    }

    const alert: Alert = {
      shown: false,
      alertWhenExpression: 'tewsRange',
      message: '',
      reEvaluateAlertExpression: () => {
        const value = this.parseNumericValue((control as any)?.value);
        const evaluated = this.evaluateTewsRangeAlert(value);
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

  private evaluateTewsRangeAlert(
    value: number
  ): { shown: boolean; message: SafeHtml | null } {
    if (isNaN(value)) {
      return { shown: false, message: null };
    }

    const category = this.getTewsCategory(value);
    if (!category) {
      return { shown: false, message: null };
    }

    return {
      shown: true,
      message: this.buildTewsAlertMessage(value, category)
    };
  }

  private getTewsCategory(
    score: number
  ): {
    label: string;
    color: string;
    description: string;
    icon: 'danger' | 'success' | 'info';
    variant: 'error' | 'warning' | 'success' | 'info';
    backgroundColor?: string;
  } | null {
    if (!isFinite(score)) {
      return null;
    }

    if (score >= 7) {
      return {
        label: 'Emergency',
        color: '#da1e28',
        description: 'Emergency (score ≥ 7)',
        icon: 'danger',
        variant: 'error'
      };
    }

    if (score >= 5) {
      return {
        label: 'Very urgent',
        color: '#FF5533',
        description: 'Very urgent (score 5-6)',
        icon: 'danger',
        variant: 'warning',
        backgroundColor: 'orange'
      };
    }

    if (score >= 3) {
      return {
        label: 'Urgent',
        color: '#f1c21b',
        description: 'Urgent (score 3-4)',
        icon: 'danger',
        variant: 'warning',
        backgroundColor: 'yellow'
      };
    }

    if (score >= 1) {
      return {
        label: 'Routine',
        color: '#24a148',
        description: 'Routine (score 0-2)',
        icon: 'success',
        variant: 'info'
      };
    }

    return null;
  }

  private buildTewsAlertMessage(
    score: number,
    category: {
      label: string;
      color: string;
      description: string;
      icon: 'danger' | 'success' | 'info';
      variant: 'error' | 'warning' | 'success' | 'info';
      backgroundColor?: string;
    }
  ): SafeHtml {
    const dangerIcon = `<svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" class="cds--inline-notification__icon" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z" data-icon-path="inner-path"></path><path d="M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"></path><path d="M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"></path><title>notification</title></svg>`;
    const successIcon = `<svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" class="cds--inline-notification__icon" xmlns="http://www.w3.org/2000/svg"><path d="M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"></path><path fill="none" d="M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z" data-icon-path="inner-path" opacity="0"></path><title>notification</title></svg>`;
    const infoIcon = `<svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" class="cds--inline-notification__icon" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M16,8a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,13.875H17.125v-8H13v2.25h1.875v5.75H12v2.25h8Z" data-icon-path="inner-path"></path><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,6a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,16.125H12v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z"></path><title>notification</title></svg>`;
    const icon =
      category.icon === 'danger'
        ? dangerIcon
        : category.icon === 'success'
        ? successIcon
        : infoIcon;
    const backgroundStyle = category.backgroundColor
      ? ` style="background-color: ${category.backgroundColor};"`
      : '';
    const html = `<div role="alert" class="cds--inline-notification cds--inline-notification--low-contrast cds--inline-notification--${category.variant} cds--inline-notification--hide-close-button"${backgroundStyle}><div class="cds--inline-notification__details">${icon}<div class="cds--inline-notification__text-wrapper"><div class="cds--inline-notification__title" dir="ltr">${category.label}</div><div class="cds--inline-notification__subtitle" dir="ltr">TEWS score ${score} · ${category.description}</div></div></div></div>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
