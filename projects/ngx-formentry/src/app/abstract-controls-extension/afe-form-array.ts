import { FormArray, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { ControlRelations } from '../change-tracking/control-relations';

export class AfeFormArray extends FormArray {
    private _controlRelations: ControlRelations;

    constructor(controls: AbstractControl[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        super(controls, validator, asyncValidator);
        this._controlRelations = new ControlRelations(this);
    }

    get controlRelations(): ControlRelations {
        return this._controlRelations;
    }

}
