import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { DateValidator } from './date.validator';

export class FutureDateRestrictionValidator {

  constructor() { }

  validate(control: AfeFormControl) {

    if (control.hidden) {
      return null;
    }

    let value = control.value;
    let now: Date = new Date();

    if (value && value.length !== 0) {

      if (!new DateValidator().validate(value)) {

        let d: Date = new Date(value);

        return d.getTime() > now.getTime() ? { 'futureDateRestriction': true } : null;
      }
    }

    return null;
  }
}
