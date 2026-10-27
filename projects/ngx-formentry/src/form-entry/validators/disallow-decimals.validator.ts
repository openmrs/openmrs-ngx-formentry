import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { isControlHidden } from './is-control-hidden';

export class DisallowDecimalsValidator {
  validate() {
    return (control: AfeFormControl): { [key: string]: any } => {
      if (isControlHidden(control)) {
        return null;
      }

      if (control.value && control.value.length !== 0) {
        const test: boolean = !/^-?\d+$/.test(control.value);
        return test ? { disallowDecimals: true } : null;
      }

      return null;
    };
  }
}
