import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';

describe('OwlDateTimeIntl', () => {
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', {
      addHour: 'Add an hour',
      nextMonth: 'Next month',
      cancel: 'Cancel'
    });
    translate.setTranslation('fr', {
      addHour: 'Ajouter une heure',
      nextMonth: 'Mois suivant',
      cancel: 'Annuler'
    });
  });

  it('translates its labels with the current language', () => {
    translate.use('en');
    const intl = TestBed.inject(OwlDateTimeIntl);

    expect(intl.upHourLabel).toBe('Add an hour');
    expect(intl.nextMonthLabel).toBe('Next month');
    expect(intl.cancelBtnLabel).toBe('Cancel');
  });

  it('updates its labels and emits changes when the language changes', () => {
    translate.use('en');
    const intl = TestBed.inject(OwlDateTimeIntl);
    const changesSpy = jasmine.createSpy('changes');
    intl.changes.subscribe(changesSpy);

    translate.use('fr');

    expect(changesSpy).toHaveBeenCalled();
    expect(intl.upHourLabel).toBe('Ajouter une heure');
    expect(intl.nextMonthLabel).toBe('Mois suivant');
    expect(intl.cancelBtnLabel).toBe('Annuler');
  });

  it('updates its labels when translations load after it is created', () => {
    const intl = TestBed.inject(OwlDateTimeIntl);
    expect(intl.upHourLabel).toBe('addHour');

    translate.use('en');

    expect(intl.upHourLabel).toBe('Add an hour');
  });
});
