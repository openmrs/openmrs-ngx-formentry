import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class DateValidator {
  constructor() {}

  validate(control: AfeFormControl) {
    if (control.hidden) {
      return null;
    }

    const value = control.value;

    if (value && value.length !== 0) {
      // YYYY-MM-DD or DD-MM-YYYY
      const test: boolean = !/Invalid|NaN/.test(new Date(value).toString());

      return test ? null : { date: true };
    } else {
      return null;
    }
  }
}
