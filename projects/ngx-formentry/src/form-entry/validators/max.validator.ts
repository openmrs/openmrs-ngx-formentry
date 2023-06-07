import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class MaxValidator {
  validate(max: number) {
    return (control: AfeFormControl): { [key: string]: any } => {
      console.log('maxValue', max, control.value, typeof control.value);

      if (control.hidden) {
        return null;
      }

      // Case 1: control.value is a number
      // all the numbers should be passed for validation
      // Case 2: control.value is not a number:
      // if its empty string or null or undefined it will return false else it will pass through for validation
      if (typeof control.value === 'number' || control.value) {
        console.log('in');
        const v: number = control.value;
        return v <= max
          ? null
          : { max: { requiredValue: max, actualValue: v } };
      }

      return null;
    };
  }
}
