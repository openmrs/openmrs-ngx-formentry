import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';


export class DateValidator {

  constructor() { }

  validate(control: AfeFormControl) {

    if (control.hidden) {
      return null;
    }

    let value = control.value;

    if (value && value.length !== 0) {

      // YYYY-MM-DD or DD-MM-YYYY
      let test: boolean = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])/.test(value) ||
        /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/.test(value) &&
        !/Invalid|NaN/.test(new Date(value).toString());

      return test ? null : { 'date': true };
    } else {
      return null;
    }
  }
}
