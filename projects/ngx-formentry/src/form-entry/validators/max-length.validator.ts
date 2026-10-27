import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { isControlHidden } from './is-control-hidden';

export class MaxLengthValidator {
  validate(maxLength: number) {
    return (control: AfeFormControl): { [key: string]: any } => {
      if (isControlHidden(control)) {
        return null;
      }

      if (control.value && control.value.length !== 0) {
        const v = control.value.toString().length;
        return v <= maxLength
          ? null
          : { maxlength: { requiredLength: maxLength, actualValue: v } };
      }

      return null;
    };
  }
}
