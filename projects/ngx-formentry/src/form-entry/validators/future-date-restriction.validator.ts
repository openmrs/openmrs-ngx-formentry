import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { isControlHidden } from './is-control-hidden';
import { DateValidator } from './date.validator';

export class FutureDateRestrictionValidator {
  constructor() {}

  validate(control: AfeFormControl) {
    if (isControlHidden(control)) {
      return null;
    }

    const value = control.value;
    const now: Date = new Date();

    if (value && value.length !== 0) {
      if (!new DateValidator().validate(value)) {
        const d: Date = new Date(value);

        return d.getTime() > now.getTime()
          ? { futureDateRestriction: true }
          : null;
      }
    }

    return null;
  }
}
