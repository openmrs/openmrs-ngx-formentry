import { FormControl } from '@angular/forms';
import { DateValidator } from './date.validator';

export class MinDateValidator {

  validate(min: Date) {

    return (control: FormControl): {[key: string]: any} => {

      if(control.value && control.value.length != 0) {

        if(!new DateValidator().validate(control.value)) {

          let newDate: Date = new Date(control.value);

          return newDate.getTime() < min.getTime() ? { 'mindate': { 'requiredDate': min, actualDate: newDate } } : null;
        } else {

          return { 'mindate': { 'requiredDate': min } };
        }
      }

      return null;
    };
  }
}
