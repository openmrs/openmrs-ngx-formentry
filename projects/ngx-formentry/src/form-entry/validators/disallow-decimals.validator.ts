import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class DisallowDecimalsValidator {
  validate() {
    return (control: AfeFormControl): { [key: string]: any } => {
      if (control.hidden) {
        return null;
      }

      if (control.value && control.value.length !== 0) {
        const test: boolean = !/^\d+$/.test(control.value);
        return test ? { disallowDecimals: true } : null;
      }

      return null;
    };
  }
}
