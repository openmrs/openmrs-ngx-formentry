import { FormGroup, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { CanHide, Hider } from '../form-entry/control-hiders-disablers/can-hide';
import { CanDisable, Disabler } from '../form-entry/control-hiders-disablers/can-disable';
import { CanGenerateAlert, Alert } from '../form-entry/control-alerts/can-generate-alert';
export declare class AfeFormGroup extends FormGroup implements CanHide, CanDisable, CanGenerateAlert {
    private _controlRelations;
    uuid: string;
    pathFromRoot: string;
    hidden: false;
    hiders: Hider[];
    alert: string;
    alerts: Alert[];
    disablers: Disabler[];
    private hiderHelper;
    private disablerHelper;
    private AlertHelper;
    constructor(controls: {
        [key: string]: AbstractControl;
    }, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn);
    readonly controlRelations: ControlRelations;
    hide(): void;
    show(): void;
    disable(param?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    setHidingFn(newHider: Hider): void;
    clearHidingFns(): void;
    updateHiddenState(): void;
    setDisablingFn(newDisabler: Disabler): void;
    clearDisablingFns(): void;
    updateDisabledState(): void;
    setAlertFn(newHider: Alert): void;
    clearMessageFns(): void;
    updateAlert(): void;
    setValue(value: any): void;
}
