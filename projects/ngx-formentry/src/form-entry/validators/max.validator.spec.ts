import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { MaxValidator } from './max.validator';

describe('MaxValidator Unit Tests', () => {
  it('should return null when value is less than the max value set', () => {
    const validator: MaxValidator = new MaxValidator();
    const max = 10;
    const value = 2;

    const formControl = new AfeFormControl(value, [validator.validate(max)]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when value is greater than the max value set', () => {
    const validator: MaxValidator = new MaxValidator();
    const max = 10;
    const value = 11;

    const formControl = new AfeFormControl(value, [validator.validate(max)]);

    expect(formControl.errors['max']).not.toBe(null);
  });
});
