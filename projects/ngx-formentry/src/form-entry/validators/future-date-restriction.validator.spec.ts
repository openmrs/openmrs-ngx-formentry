import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { FutureDateRestrictionValidator } from './future-date-restriction.validator';

describe('FutureDateRestrictionValidator Unit Tests', () => {

  it('should return null when a past date is provided', () => {

    const validator: FutureDateRestrictionValidator = new FutureDateRestrictionValidator();
    const date = '2016-11-01';

    const formControl = new AfeFormControl(date, [validator.validate]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when the wrong date format is provided', () => {

    const validator: FutureDateRestrictionValidator = new FutureDateRestrictionValidator();
    const date = '2300-11-11';

    const formControl = new AfeFormControl(date, [validator.validate]);

    expect(formControl.errors['futureDateRestriction']).toBe(true);
  });
});
