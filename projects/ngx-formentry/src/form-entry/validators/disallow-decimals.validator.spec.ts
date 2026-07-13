import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { DisallowDecimalsValidator } from './disallow-decimals.validator';

describe('DisallowDecimalsValidator', () => {
  it('should return null when a non-decimal value is provided', () => {
    const validator: DisallowDecimalsValidator = new DisallowDecimalsValidator();
    const number = '123';

    const formControl = new AfeFormControl(number, [validator.validate]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when a decimal value is provided', () => {
    const validator: DisallowDecimalsValidator = new DisallowDecimalsValidator();
    const number = '123.456';

    const formControl = new AfeFormControl(number, [validator.validate()]);

    expect(formControl.errors['disallowDecimals']).toBe(true);
  });

  it('should return null when a negative integer is provided', () => {
    const validator: DisallowDecimalsValidator = new DisallowDecimalsValidator();

    const formControl = new AfeFormControl('-42', [validator.validate()]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when a negative decimal is provided', () => {
    const validator: DisallowDecimalsValidator = new DisallowDecimalsValidator();

    const formControl = new AfeFormControl('-42.5', [validator.validate()]);

    expect(formControl.errors['disallowDecimals']).toBe(true);
  });
});
