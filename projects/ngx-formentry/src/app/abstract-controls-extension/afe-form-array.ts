import { FormArray, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { ControlRelations } from '../change-tracking/control-relations';

import { CanHide, Hider } from '../form-entry/control-hiders-disablers/can-hide';
import { CanDisable, Disabler } from '../form-entry/control-hiders-disablers/can-disable';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';


export class AfeFormArray extends FormArray implements CanHide, CanDisable {
    private _controlRelations: ControlRelations;
    public uuid: string;
    public pathFromRoot: string;

    hidden: false;
    hiders: Hider[];

    disablers: Disabler[];

    private hiderHelper: HiderHelper = new HiderHelper();
    private disablerHelper: DisablerHelper = new DisablerHelper();

    constructor(controls: AbstractControl[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        super(controls, validator, asyncValidator);
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.disablers = [];
    }

    get controlRelations(): ControlRelations {
        return this._controlRelations;
    }

    hide() {
        this.hiderHelper.hideControl(this);
    }

    show() {
        this.hiderHelper.showControl(this);
    }

    setHidingFn(newHider: Hider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }

    clearHidingFns() {
        this.hiderHelper.clearHidersForControl(this);
    }

    updateHiddenState() {
        this.hiderHelper.evaluateControlHiders(this);
    }

    setDisablingFn(newDisabler: Disabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    }

    clearDisablingFns() {
        this.disablerHelper.clearDisablersForControl(this);
    }

    updateDisabledState() {
        this.disablerHelper.evaluateControlDisablers(this);
    }

}
