import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class MaxValidator {

  validate(max: number) {

    return (control: AfeFormControl): { [key: string]: any } => {

      if (control.hidden) {
        return null;
      }

      if (control.value && control.value.length !== 0) {

        let v: number = control.value;
        return v <= max ? null : { 'max': { requiredValue: max, actualValue: v } };
      }

      return null;
    };
  }
}
