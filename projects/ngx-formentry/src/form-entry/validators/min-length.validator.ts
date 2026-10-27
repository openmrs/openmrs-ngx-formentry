import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { isControlHidden } from './is-control-hidden';

export class MinLengthValidator {
  validate(minLength: number) {
    return (control: AfeFormControl): { [key: string]: any } => {
      if (isControlHidden(control)) {
        return null;
      }

      if (control.value && control.value.length !== 0) {
        const v = control.value.toString().length;
        return v >= minLength
          ? null
          : { minlength: { requiredLength: minLength, actualValue: v } };
      }

      return null;
    };
  }
}
