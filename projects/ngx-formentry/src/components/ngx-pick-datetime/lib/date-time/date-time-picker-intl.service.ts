/**
 * date-time-picker-intl.service
 */

import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription, merge } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OwlDateTimeIntl implements OnDestroy {
  private readonly translationChangesSub: Subscription;

  constructor(public translate: TranslateService) {
    this.setLabels();
    this.translationChangesSub = merge(
      translate.onLangChange,
      translate.onTranslationChange,
      translate.onDefaultLangChange
    ).subscribe(() => {
      this.setLabels();
      this.changes.next();
    });
  }
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** A label for the up second button (used by screen readers).  */
  upSecondLabel: string;

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel: string;

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel: string;

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel: string;

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel: string;

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel: string;

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel: string;

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel: string;

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel: string;

  /** A label for the next year button (used by screen readers). */
  nextYearLabel: string;

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel: string;

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel: string;

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel: string;

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel: string;

  /** A label for the cancel button */
  cancelBtnLabel: string;

  /** A label for the set button */
  setBtnLabel: string;

  /** A label for the range 'from' in picker info */
  rangeFromLabel: string;

  /** A label for the range 'to' in picker info */
  rangeToLabel: string;

  /** A label for the hour12 button (AM) */
  hour12AMLabel = 'AM';

  /** A label for the hour12 button (PM) */
  hour12PMLabel = 'PM';

  ngOnDestroy(): void {
    this.translationChangesSub.unsubscribe();
  }

  private setLabels(): void {
    this.upSecondLabel = this.translate.instant('addSecond');
    this.downSecondLabel = this.translate.instant('minusSecond');
    this.upMinuteLabel = this.translate.instant('addMinute');
    this.downMinuteLabel = this.translate.instant('minusMinute');
    this.upHourLabel = this.translate.instant('addHour');
    this.downHourLabel = this.translate.instant('minusHour');
    this.prevMonthLabel = this.translate.instant('previousMonth');
    this.nextMonthLabel = this.translate.instant('nextMonth');
    this.prevYearLabel = this.translate.instant('previousYear');
    this.nextYearLabel = this.translate.instant('nextYear');
    this.prevMultiYearLabel = this.translate.instant('previous21Years');
    this.nextMultiYearLabel = this.translate.instant('next21Years');
    this.switchToMonthViewLabel = this.translate.instant('changeToMonthView');
    this.switchToMultiYearViewLabel = this.translate.instant(
      'chooseMonthAndYear'
    );
    this.cancelBtnLabel = this.translate.instant('cancel');
    this.setBtnLabel = this.translate.instant('set');
    this.rangeFromLabel = this.translate.instant('from');
    this.rangeToLabel = this.translate.instant('to');
  }
}
