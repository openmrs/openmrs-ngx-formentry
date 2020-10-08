import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { MinValidator } from './min.validator';

describe('MinValidator Unit Tests', () => {
  it('should return null when value is greater than the min value set', () => {
    const validator: MinValidator = new MinValidator();
    const min = 1;
    const value = 2;

    const formControl = new AfeFormControl(value, [validator.validate(min)]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when value is less than the min value set', () => {
    const validator: MinValidator = new MinValidator();
    const min = 1;
    const value = -1;

    const formControl = new AfeFormControl(value, [validator.validate(min)]);

    expect(formControl.errors['min']).not.toBe(null);
  });
});
