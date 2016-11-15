import { FormControl } from '@angular/forms';
import { FutureDateRestrictionValidator } from './future-date-restriction.validator';

describe('FutureDateRestrictionValidator Unit Tests', () => {

  it('should return null when a past date is provided', () => {

    let validator: FutureDateRestrictionValidator = new FutureDateRestrictionValidator();
    let date = '2016-11-01';

    let formControl = new FormControl(date, [ validator.validate ]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when the wrong date format is provided', () => {

    let validator: FutureDateRestrictionValidator = new FutureDateRestrictionValidator();
    let date = '2300-11-11';

    let formControl = new FormControl(date, [ validator.validate ]);

    expect(formControl.errors.futureDateRestriction).toBe(true);
  });
});
