import { AbstractControl } from '@angular/forms';
export declare class ControlRelation {
    private _control;
    private _relatedTo;
    private _lastUpdateValue;
    constructor(control: AbstractControl, relatedTo: AbstractControl);
    readonly control: AbstractControl;
    readonly relatedTo: AbstractControl;
    readonly lastUpdateValue: any;
    updateControlBasedOnRelation(newValue: any): boolean;
    private _registerForChangesFromRelatedControl();
}
