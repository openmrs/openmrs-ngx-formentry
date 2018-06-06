import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class MinValidator {


  validate(min: number) {

    return (control: AfeFormControl): { [key: string]: any } => {

      if (control.hidden) {
        return null;
      }
      if (control.value && control.value.length !== 0) {

        let v: number = control.value;
        return v >= min ? null : { 'min': { requiredValue: min, actualValue: v } };
      }

      return null;
    };
  }
}
