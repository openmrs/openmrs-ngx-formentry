import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class MaxLengthValidator {
  validate(maxLength: number) {
    return (control: AfeFormControl): { [key: string]: any } => {
      if (control.hidden) {
        return null;
      }

      if (control.value && control.value.length !== 0) {
        const v: number = String(control.value).length;
        return v <= maxLength
          ? null
          : { maxlength: { requiredLength: maxLength, actualValue: v } };
      }

      return null;
    };
  }
}
