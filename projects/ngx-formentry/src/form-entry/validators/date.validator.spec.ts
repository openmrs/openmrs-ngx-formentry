import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

import { DateValidator } from './date.validator';

describe('DateValidator Unit Tests', () => {

  it('should return null when the correct date value is provided', () => {

    const validator: DateValidator = new DateValidator();
    const date = '2016-11-14';

    const formControl = new AfeFormControl(date, [ validator.validate ]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when a future date is provided', () => {

    const validator: DateValidator = new DateValidator();
    const date = 'fake date';

    const formControl = new AfeFormControl(date, [ validator.validate ]);

    expect(formControl.errors['date']).toBe(true);
  });
});
