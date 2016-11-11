// import { AfeFormControl } from '@angular/forms';
import { AfeFormControl } from '../abstract-controls-extension/afe-form-control'

import { ControlGroupService } from './control-group.service';
import { Validation } from './question-models/validation';
export class CustomValidators {
  static match(key: string, service: ControlGroupService) {
    return (control: AfeFormControl) => {
      if (control.value) {
        let value = window[key];
        return value !== control.value ? {
          'match': {
            'currentValue': control.value,
            'requiredValue': value, 'mustMatchField': key
          }
        } : false;
      }
      return null;
    };
  }
  static jsValidator(validation: Validation, service: ControlGroupService) {
    return (control: AfeFormControl): { [key: string]: any } => {
      for (let reference of validation.controls) {
        let referenced = service.controls.find(a => a.id.toLowerCase() === reference.toLowerCase());
        window[reference] = '';
        if (referenced) {
          window[reference] = referenced.control.value;
          referenced.control.valueChanges.subscribe(data => {
            control.updateValueAndValidity();
          });

        }
      }
      let myValue = control.value;
      if (eval(validation.value)) {
        return null;
      }
      return { 'jsValidator': {} };
    };
  }
  contains(stringArray, element) {
    return stringArray.indexOf(element) > -1;
  };
}
