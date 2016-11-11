import { FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { ControlRelations } from '../change-tracking/control-relations';

export class AfeFormControl extends FormControl {
    private _controlRelations: ControlRelations;

    constructor(formState?: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]) {
        super(formState, validator, asyncValidator);
        this._controlRelations = new ControlRelations(this);
    }

    get controlRelations(): ControlRelations {
        return this._controlRelations;
    }

}
