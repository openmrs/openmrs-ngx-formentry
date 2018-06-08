import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { MinDateValidator } from './min-date.validator';

describe('MinDateValidator Unit Tests', () => {

  it('should return null when date is greater than the min date set', () => {

    const validator: MinDateValidator = new MinDateValidator();
    const minDate = new Date('2016-11-10');
    const date = '2016-11-13';

    const formControl = new AfeFormControl(date, [validator.validate(minDate)]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when date is less than the min date set', () => {

    const validator: MinDateValidator = new MinDateValidator();
    const minDate = new Date();
    const date = '2016-11-13';

    const formControl = new AfeFormControl(date, [validator.validate(minDate)]);

    expect(formControl.errors['mindate']).not.toBe(null);
  });
});
