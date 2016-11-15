import { FormControl } from '@angular/forms';

export class MaxValidator {

  validate(max: number) {

    return (control: FormControl): {[key: string]: any} => {

      if(control.value && control.value.length != 0) {

        let v: number = control.value;
        return v <= max ? null : { 'max': { requiredValue: max, actualValue: v } };
      }

      return null;
    };
  }
}
