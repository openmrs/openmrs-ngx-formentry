import { AbstractControl } from '@angular/forms';
import { ControlRelation } from './control-relation';
export declare class ControlRelations {
    private _relationFor;
    private _relations;
    private _otherRelations;
    constructor(relationFor: AbstractControl, relatedTo?: AbstractControl | AbstractControl[]);
    readonly relationsFor: AbstractControl;
    readonly relations: ControlRelation[];
    readonly otherRelations: any;
    addRelatedControls(relatedTo: AbstractControl | AbstractControl[]): void;
}
