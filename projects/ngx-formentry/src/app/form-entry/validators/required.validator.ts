import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';

export class RequiredValidator {

  validate(control: AfeFormControl) {

    if (control.hidden) {
      return null;
    }

    let value: any = control.value;
    let isEmpty: boolean = value == null || typeof value === 'string' && value.length === 0;

    return isEmpty ? { 'required': true } : null;
  }
}
