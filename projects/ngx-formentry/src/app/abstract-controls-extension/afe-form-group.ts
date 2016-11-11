import { FormGroup, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { ControlRelations } from '../change-tracking/control-relations';

export class AfeFormGroup extends FormGroup {
    private _controlRelations: ControlRelations;

    constructor(controls: {[key: string]: AbstractControl}, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        super(controls, validator, asyncValidator);
        this._controlRelations = new ControlRelations(this);
    }

    get controlRelations(): ControlRelations {
        return this._controlRelations;
    }

}
