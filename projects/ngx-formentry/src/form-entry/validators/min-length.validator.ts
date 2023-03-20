import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class MinLengthValidator {
  validate(minLength: number) {
    return (control: AfeFormControl): { [key: string]: any } => {
      if (control.hidden) {
        return null;
      }

      if (control.value && control.value.length !== 0) {
        const v: number = String(control.value).length;
        return v >= minLength
          ? null
          : { minlength: { requiredLength: minLength, actualValue: v } };
      }

      return null;
    };
  }
}
