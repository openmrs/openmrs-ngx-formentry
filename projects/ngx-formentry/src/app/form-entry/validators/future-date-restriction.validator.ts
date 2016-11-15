import { FormControl } from '@angular/forms';
import { DateValidator } from './date.validator';

export class FutureDateRestrictionValidator {

  constructor() {}

  validate(c: FormControl) {

    let value = c.value;
    let now: Date = new Date();

    if(value && value.length != 0) {

      if(!new DateValidator().validate(c.value)) {

        let d: Date = new Date(c.value);

        return d.getTime() > now.getTime() ? { 'futureDateRestriction': true } : null;
      }
    }

    return null;
  }
}
