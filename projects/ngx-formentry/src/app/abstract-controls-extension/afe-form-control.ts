import { FormControl, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { ControlRelations } from '../change-tracking/control-relations';

import { CanHide, Hider } from '../form-entry/control-hiders-disablers/can-hide';
import { CanDisable, Disabler } from '../form-entry/control-hiders-disablers/can-disable';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { CanCalculate } from '../form-entry/control-calculators/can-calculate';
import { Runnable } from '../form-entry/expression-runner/expression-runner';

export class AfeFormControl extends FormControl implements CanHide, CanDisable, CanCalculate {
    private _controlRelations: ControlRelations;

    public uuid: string;
    public pathFromRoot: string;

    hidden: boolean = false;
    hiders: Hider[];
    calculator: Function;
    disablers: Disabler[];

    private hiderHelper: HiderHelper = new HiderHelper();
    private disablerHelper: DisablerHelper = new DisablerHelper();
    constructor(formState?: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]) {
        super(formState, validator, asyncValidator);
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

    setCalculatorFn(newCalculator: Function) {
      this.calculator = newCalculator;
    }

    updateCalculatedValue() {
      if (this.calculator) {
        let _val = this.calculator.call(Runnable, {});
        if (this.value === '') {
          this.setValue(_val);
        }
      }
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
