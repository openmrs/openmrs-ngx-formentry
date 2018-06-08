import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { MaxDateValidator } from './max-date.validator';
beforeEach(function(done) {
  window.setTimeout(function() {
    done();
  }, 0);
});
describe('MaxDateValidator Unit Tests', () => {

  it('should return null when date is less than the max date set', () => {

    const validator: MaxDateValidator = new MaxDateValidator();
    const maxDate = new Date();
    const date = '2016-11-14';

    const formControl = new AfeFormControl(date, [validator.validate(maxDate)]);

    expect(formControl.errors).toBe(null);
  });

  it('should return an error when date is greater than the max date set', () => {

    const validator: MaxDateValidator = new MaxDateValidator();
    const maxDate = new Date();
    const date = '2300-11-14';

    const formControl = new AfeFormControl(date, [validator.validate(maxDate)]);

    expect(formControl.errors['maxdate']).not.toBe(null);
  });
});
