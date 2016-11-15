import { FormControl } from '@angular/forms';
import { MaxValidator } from './max.validator';

describe('MaxValidator Unit Tests', () => {

  it('should return null when value is less than the max value set', () => {

    let validator: MaxValidator = new MaxValidator();
    let max = 10;
    let value = 2;

    let formControl = new FormControl(value, [ validator.validate(max) ]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when value is greater than the max value set', () => {

    let validator: MaxValidator = new MaxValidator();
    let max = 10;
    let value = 11;

    let formControl = new FormControl(value, [ validator.validate(max) ]);

    expect(formControl.errors.max).not.toBe(null);
  });
});
