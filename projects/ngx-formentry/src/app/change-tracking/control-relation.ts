import { AbstractControl } from '@angular/forms';

// import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
// import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';

export class ControlRelation {
    private _control: AbstractControl;
    private _relatedTo: AbstractControl;
    private _lastUpdateValue: any;

    constructor(control: AbstractControl, relatedTo: AbstractControl) {
        this._control = control;
        this._relatedTo = relatedTo;
        this._registerForChangesFromRelatedControl();
    }

    get control(): AbstractControl {
        return this._control;
    }

    get relatedTo(): AbstractControl {
        return this._relatedTo;
    }

    get lastUpdateValue(): any {
        return this._lastUpdateValue;
    }

    updateControlBasedOnRelation(newValue: any): boolean {
        if (newValue !== this._lastUpdateValue) {
            this._lastUpdateValue = newValue;

            if ((this._control as any).updateCalculatedValue) {
              (this._control as any).updateCalculatedValue();
            }

            this._control.updateValueAndValidity();
            if ((this._control as any).updateHiddenState) {
                (this._control as any).updateHiddenState();
            }

            if ((this._control as any).updateDisabledState) {
                (this._control as any).updateDisabledState();
            }
            return true;
        }
        return false;
    }

    private _registerForChangesFromRelatedControl() {

      this._relatedTo.valueChanges.subscribe((value) => {
        this.updateControlBasedOnRelation(value);
      });
    }
}
