import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { isControlHidden } from './is-control-hidden';

export class RequiredValidator {
  validate(control: AfeFormControl) {
    if (isControlHidden(control)) {
      return null;
    }

    const value: any = control.value;
    const isEmpty: boolean =
      value == null || (typeof value === 'string' && value.length === 0);

    return isEmpty ? { required: true } : null;
  }
}
