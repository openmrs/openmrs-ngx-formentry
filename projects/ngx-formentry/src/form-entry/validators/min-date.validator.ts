import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { DateValidator } from './date.validator';

export class MinDateValidator {
  validate(min: Date) {
    return (control: AfeFormControl): { [key: string]: any } => {
      if (control.hidden) {
        return null;
      }

      if (control.value && control.value.length !== 0) {
        if (!new DateValidator().validate(control.value)) {
          const newDate: Date = new Date(control.value);

          return newDate.getTime() < min.getTime()
            ? { mindate: { requiredDate: min, actualDate: newDate } }
            : null;
        } else {
          return { mindate: { requiredDate: min } };
        }
      }

      return null;
    };
  }
}
