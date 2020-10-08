import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class RequiredValidator {
  validate(control: AfeFormControl) {
    if (control.hidden) {
      return null;
    }

    const value: any = control.value;
    const isEmpty: boolean =
      value == null || (typeof value === 'string' && value.length === 0);

    return isEmpty ? { required: true } : null;
  }
}
